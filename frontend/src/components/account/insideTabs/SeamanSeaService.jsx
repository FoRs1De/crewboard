import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import dayjs from 'dayjs';
import ranksSelect from '../../../assets/ranksSelect';
import countryList from '../../../assets/countries';
import shipTypes from '../../../assets/shipTypes';
import flagStates from '../../../assets/flagStates';
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  FormOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import axios from 'axios';

const SeamanSeaService = ({ user, setSubmittedForm }) => {
  const { Option } = Select;
  const [isOpen, setIsOpen] = useState(false);
  const uuid = uuidv4();

  const onSubmitAddServiceRecord = (values) => {
    console.log(values);
    let signOnDate;
    if (values.signOnDate && values.signOnDate.$d) {
      signOnDate = values.signOnDate.$d;
      signOnDate = moment(signOnDate).format('DD.MM.YYYY');
    } else {
      signOnDate = null;
    }
    let signOffDate;
    if (values.signOffDate && values.signOffDate.$d) {
      signOffDate = values.signOffDate.$d;
      signOffDate = moment(signOffDate).format('DD.MM.YYYY');
    } else {
      signOffDate = null;
    }

    const dataToSend = {
      seaService: {
        id: uuid,
        position: values.position,
        vesselName: values.vesselName,
        vesselType: values.vesselType,
        vesselFlag: values.vesselFlag,
        vesselDWT: values.vesselDWT,
        vesselYearBuilt: values.vesselYearBuilt,
        mainEngineType: values.mainEngineType,
        mainEngineKw: values.mainEngineKw,
        shipOwner: values.shipOwner,
        crewing: values.crewing,
        signOnDate: signOnDate,
        signOffDate: signOffDate,
      },
    };
    console.log(dataToSend);

    const putUpdateEmployerData = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/update-seaman/`,
          dataToSend
        );
        setIsOpen((prevState) => !prevState);
        setSubmittedForm((prevState) => !prevState);
      } catch (error) {
        console.log(error.message);
      }
    };
    putUpdateEmployerData();
  };

  const transformedArray = ranksSelect.map((category) => {
    return {
      label: category.label,
      options: category.options.map((option) => ({
        label: option,
        value: option,
      })),
    };
  });

  //Check Status of profile completion
  const status = [
    user.personalDetails.firstName,
    user.personalDetails.dateOfBirth,
    user.personalDetails.lastName,
    user.personalDetails.cityzenship,
    user.personalDetails.residence,
    user.personalDetails.city,
    user.personalDetails.address,
    user.personalDetails.phone,
    user.personalDetails.airport,
    user.personalDetails.englishLevel,
    user.personalDetails.height,
    user.personalDetails.weight,
    user.personalDetails.sizeShoe,
    user.personalDetails.sizeOverall,
    user.personalDetails.colorHair,
  ];
  const isProfileComplete = status.every((item) => !!item);
  const isAtLeastOneComplete = status.some((item) => !!item);

  const disabledDate = (current) => {
    // If the date is before today, disable it
    return current && current > moment().startOf('day');
  };

  let jsDate;
  if (user.personalDetails.dateOfBirth) {
    jsDate = dayjs(user.personalDetails.dateOfBirth, 'DD.MM.YYYY');
  }

  return (
    <>
      {' '}
      <div className="seaman-data-wrapper">
        <div className="seaman-data-top">
          <div className="seaman-data-top-left">
            <AlignLeftOutlined />
            <h2>Sea Service</h2>
          </div>
          <div className="seaman-data-top-right">
            {isProfileComplete ? (
              <p>Your profile is ok</p>
            ) : isAtLeastOneComplete ? (
              <p>Can be improved</p>
            ) : (
              <p>No data filled</p>
            )}
          </div>
        </div>
        <div className="seaman-data-body">
          {isOpen ? (
            <div className="sea-service-form">
              {' '}
              <Form
                layout="vertical"
                initialValues={{}}
                onFinish={onSubmitAddServiceRecord}
              >
                <div className="form-inputs">
                  <Form.Item
                    className="input"
                    name="position"
                    label="Your Position"
                    rules={[
                      {
                        required: true,
                        message: 'Please select!',
                      },
                    ]}
                  >
                    <Select options={transformedArray} showSearch></Select>
                  </Form.Item>
                  <Form.Item
                    className="input"
                    name="vesselName"
                    label="Vessel Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="form-inputs">
                  <Form.Item
                    className="input"
                    name="vesselType"
                    label="Vessel Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please select!',
                      },
                    ]}
                  >
                    <Select showSearch>
                      {shipTypes.map((ship, index) => (
                        <Option key={index} value={ship}>
                          {ship}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="input"
                    name="vesselFlag"
                    label="Vessel Flag"
                    rules={[
                      {
                        required: true,
                        message: 'Please select!',
                      },
                    ]}
                  >
                    <Select showSearch>
                      {flagStates.map((state, index) => (
                        <Option key={index} value={state}>
                          {state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="form-inputs">
                  <Form.Item
                    className="input"
                    name="vesselDWT"
                    label="Vessel DWT"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <InputNumber className="input-number" />
                  </Form.Item>
                  <Form.Item
                    className="input"
                    name="vesselYearBuilt"
                    label="Year Built"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <InputNumber className="input-number" />
                  </Form.Item>
                </div>
                <div className="form-inputs">
                  <Form.Item
                    className="input"
                    name="mainEngineType"
                    label="ME type"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="input"
                    name="mainEngineKw"
                    label="Main Engine, kW"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <InputNumber className="input-number" />
                  </Form.Item>
                </div>
                <div className="form-inputs">
                  <Form.Item
                    className="input"
                    name="shipOwner"
                    label="Shipowner"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="input"
                    name="crewing"
                    label="Crewing Agency"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="form-inputs">
                  <Form.Item
                    name="signOnDate"
                    label="Sign-on date"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <DatePicker
                      className="input"
                      allowEmpty
                      disabledDate={disabledDate}
                      placeholder="DD.MM.YYYY"
                      format="DD.MM.YYYY"
                    />
                  </Form.Item>
                  <Form.Item
                    name="signOffDate"
                    label="Sign-off date"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill in!',
                      },
                    ]}
                  >
                    <DatePicker
                      className="input"
                      allowEmpty
                      placeholder="DD.MM.YYYY"
                      format="DD.MM.YYYY"
                    />
                  </Form.Item>
                </div>
                <div className="sea-service-form-buttons">
                  <Form.Item className="sea-service-form-submit">
                    <Button type="primary" htmlType="submit">
                      Save Data
                    </Button>
                  </Form.Item>
                  <div>
                    <Button onClick={() => setIsOpen((prev) => !prev)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          ) : (
            <div>
              {user.seaService ? (
                <div>Yes</div>
              ) : (
                <div>No service records yet...</div>
              )}
              <div className="seaman-data-bottom">
                <Button onClick={() => setIsOpen(true)} type="primary">
                  <PlusOutlined /> Add Record
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeamanSeaService;
