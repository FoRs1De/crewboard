import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import dayjs from 'dayjs';
import ranksSelect from '../../../assets/ranksSelect';
import { Link } from 'react-router-dom';
import shipTypes from '../../../assets/shipTypes';
import flagStates from '../../../assets/flagStates';
import { AlignLeftOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
} from 'antd';
import axios from 'axios';

const SeamanSeaService = ({ user, setSubmittedForm, setUpdateSeamen }) => {
  const { Option } = Select;
  const [isOpen, setIsOpen] = useState(false);
  const uuid = uuidv4();
  const [serviceRecordData, setServiceRecordData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmitAddServiceRecord = (values) => {
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

    let dataToSend;
    if (serviceRecordData.id) {
      dataToSend = {
        seaService: {
          id: serviceRecordData.id,
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
    } else {
      dataToSend = {
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
    }

    const putUpdateEmployerData = async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/update-seaman/`,
          dataToSend
        );
        const currentDate = moment().utc().format('DD MMM YYYY');
        await axios.put(`${import.meta.env.VITE_API_URL}/update-seaman/`, {
          updated: currentDate,
        });
        setUpdateSeamen((prev) => !prev);
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

  const handleServiceRecordEdit = (id) => {
    const record = user.seaService.find((record) => record.id === id);

    setServiceRecordData(record);
    setIsOpen(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleServiceRecordDelete = (id) => {
    // Show the modal for confirmation
    showModal();

    // Handle the delete when confirmed
    const confirmDelete = async () => {
      const dataToSend = {
        deleteId: id,
      };

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/update-seaman/`,
          dataToSend
        );
        handleCancel();
        setUpdateSeamen((prev) => !prev);
        setSubmittedForm((prevState) => !prevState);
      } catch (error) {
        console.log(error.message);
      }
    };

    Modal.confirm({
      centered: true,
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this service record?',
      onOk: confirmDelete,
      onCancel: handleCancel,
    });
  };

  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };

  let jsDateSignOn;
  if (serviceRecordData.signOnDate) {
    jsDateSignOn = dayjs(serviceRecordData.signOnDate, 'DD.MM.YYYY');
  }
  let jsDateSignOff;
  if (serviceRecordData.signOffDate) {
    jsDateSignOff = dayjs(serviceRecordData.signOffDate, 'DD.MM.YYYY');
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
            <h4>Last update: {user.updated}</h4>
          </div>
        </div>
        <div className="seaman-data-body">
          {isOpen ? (
            <div className="sea-service-form">
              {' '}
              <Form
                layout="vertical"
                initialValues={{
                  position: serviceRecordData.position,
                  vesselName: serviceRecordData.vesselName,
                  vesselType: serviceRecordData.vesselType,
                  vesselFlag: serviceRecordData.vesselFlag,
                  vesselDWT: serviceRecordData.vesselDWT,
                  vesselYearBuilt: serviceRecordData.vesselYearBuilt,
                  mainEngineType: serviceRecordData.mainEngineType,
                  mainEngineKw: serviceRecordData.mainEngineKw,
                  shipOwner: serviceRecordData.shipOwner,
                  crewing: serviceRecordData.crewing,
                  signOnDate: jsDateSignOn,
                  signOffDate: jsDateSignOff,
                }}
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
            <div className="service-records-body">
              {user.seaService.length > 0 ? (
                <div className="seaman-service-records">
                  {user.seaService.map((record) => {
                    return (
                      <div key={record.id} className="seaman-service-record">
                        <div className="service-record-left-right">
                          <div className="service-record-left">
                            <h4>{record.position}</h4>{' '}
                            <p>
                              <strong>{record.vesselName}</strong> from{' '}
                              <strong>{record.signOnDate}</strong> to{' '}
                              <strong>{record.signOffDate}</strong>
                            </p>
                          </div>
                          <div className="service-record-right">
                            <Link
                              onClick={() => handleServiceRecordEdit(record.id)}
                            >
                              Edit
                            </Link>
                            <Link
                              onClick={() =>
                                handleServiceRecordDelete(record.id)
                              }
                            >
                              Delete
                            </Link>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No service records yet...</div>
              )}
              <div className="seaman-data-bottom">
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setServiceRecordData({});
                  }}
                  type="primary"
                >
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
