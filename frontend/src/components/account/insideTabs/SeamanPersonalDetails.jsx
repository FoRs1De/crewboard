import { useState } from 'react';

import moment from 'moment';
import dayjs from 'dayjs';
import countryList from '../../../assets/countries';
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';

const SeamanPersonalDetails = ({ user, setSubmittedForm }) => {
  const { Option } = Select;

  const [isOpen, setIsOpen] = useState(true);

  const onSubmitPersonalInfo = (values) => {
    let birthDate;
    if (values.dateOfBirth && values.dateOfBirth.$d) {
      birthDate = values.dateOfBirth.$d;
      birthDate = moment(birthDate).format('DD.MM.YYYY');
    } else {
      birthDate = null;
    }

    const dataToSend = {
      personalDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: birthDate,
        cityzenship: values.cityzenship,
        residence: values.residence,
        city: values.city,
        address: values.address,
        phone: values.phone,
        airport: values.airport,
        englishLevel: values.englishLevel,
        height: values.height,
        weight: values.weight,
        sizeShoe: values.sizeShoe,
        sizeOverall: values.sizeOverall,
        colorHair: values.colorHair,
        colorEye: values.colorEye,
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
    // Calculate the date 16 years ago from the current date
    const sixteenYearsAgo = moment().subtract(17, 'years');

    // Disable dates that are before 16 years ago
    return (
      (current && current > moment().startOf('day')) ||
      current > sixteenYearsAgo
    );
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
          <div
            className="seaman-data-top-left"
            onClick={() => {
              setIsOpen((prevState) => !prevState);
            }}
          >
            {!isOpen ? (
              <CloseCircleOutlined
                style={{ fontSize: '26px', cursor: 'pointer' }}
              />
            ) : (
              <EditOutlined style={{ fontSize: '26px', cursor: 'pointer' }} />
            )}{' '}
            <h2>Personal Details</h2>
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
            <div className="seaman-data-columns">
              <div className="seaman-data-column">
                <div className="seaman-check-data">
                  <div className="status">
                    {user.personalDetails.firstName ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.firstName
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">First Name </p>{' '}
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.lastName ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.lastName
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key"> Last Name </p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.dateOfBirth ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.dateOfBirth
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Date Of Birth</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.cityzenship ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.cityzenship
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Cityzenship</p>
                  </div>
                </div>
              </div>
              <div className="seaman-data-column">
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.residence ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.residence
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Country of Residence</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.city ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.city
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">City</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.address ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.address
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Address</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.phone ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.phone
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Phone Number</p>
                  </div>
                </div>
              </div>
              <div className="seaman-data-column">
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.airport ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.airport
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Closest Airport</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.englishLevel ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.englishLevel
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Level of English</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.height ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.height
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Height</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.weight ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.weight
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Weight</p>
                  </div>
                </div>
              </div>
              <div className="seaman-data-column">
                {' '}
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.colorHair ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.colorHair
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Hair Color</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.colorEye ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.colorEye
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Eye Color</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.sizeShoe ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.sizeShoe
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Shoe Size</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.personalDetails.sizeOverall ? (
                      <CheckCircleOutlined
                        style={{
                          fontSize: '18px',
                          color: '#6BC259',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    ) : (
                      <FormOutlined
                        style={{
                          fontSize: '18px',
                          color: '#b4c5d5',
                          marginTop: 5,
                        }}
                        onClick={() => {
                          setIsOpen((prevState) => !prevState);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={
                      user.personalDetails.sizeOverall
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Overall Size</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="employer-data-form">
              {' '}
              <Form
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                layout="vertical"
                style={{
                  maxWidth: 400,
                }}
                initialValues={{
                  firstName: user.personalDetails.firstName,
                  lastName: user.personalDetails.lastName,
                  dateOfBirth: jsDate,
                  cityzenship: user.personalDetails.cityzenship,
                  residence: user.personalDetails.residence,
                  city: user.personalDetails.city,
                  address: user.personalDetails.address,
                  phone: user.personalDetails.phone,
                  airport: user.personalDetails.airport,
                  englishLevel: user.personalDetails.englishLevel,
                  height: user.personalDetails.height,
                  weight: user.personalDetails.weight,
                  sizeShoe: user.personalDetails.sizeShoe,
                  sizeOverall: user.personalDetails.sizeOverall,
                  colorHair: user.personalDetails.colorHair,
                  colorEye: user.personalDetails.colorEye,
                }}
                onFinish={onSubmitPersonalInfo}
              >
                <Form.Item name="firstName" label="First Name">
                  <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                  <Input />
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Date Of Birth">
                  <DatePicker
                    allowEmpty
                    disabledDate={disabledDate}
                    placeholder="DD.MM.YYYY"
                    format="DD.MM.YYYY"
                  />
                </Form.Item>
                <Form.Item name="cityzenship" label="Cityzenship">
                  <Select placeholder="Select country" showSearch>
                    {countryList.map((country, index) => (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="residence" label="Country of residence">
                  <Select placeholder="Select country" showSearch>
                    {countryList.map((country, index) => (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone Number">
                  <Input placeholder="+38" />
                </Form.Item>
                <Form.Item name="airport" label="Closest Airport">
                  <Input />
                </Form.Item>
                <Form.Item name="englishLevel" label="Level of English">
                  <Select>
                    <Option value="Beginner">Beginner</Option>
                    <Option value="Elementary">Elementary</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Upper Intermediate">
                      Upper Intermediate
                    </Option>
                    <Option value="Advanced">Advanced</Option>
                    <Option value="Proficient">Proficient</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="height" label="Height, cm">
                  <Input />
                </Form.Item>
                <Form.Item name="weight" label="Weight, kg">
                  <Input />
                </Form.Item>
                <Form.Item name="sizeShoe" label="Shoe Size, cm">
                  <Input />
                </Form.Item>
                <Form.Item name="sizeOverall" label="Overall Size">
                  <Input />
                </Form.Item>
                <Form.Item name="colorHair" label="Hair Color">
                  <Select>
                    <Option value="Blond">Blond</Option>
                    <Option value="Black">Black</Option>
                    <Option value="Brown">Brown</Option>
                    <Option value="Ginger">Ginger</Option>
                    <Option value="Gray">Gray</Option>
                    <Option value="Bald">Bald</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="colorEye" label="Eye Color">
                  <Select>
                    <Option value="Blue">Blue</Option>
                    <Option value="Gray">Gray</Option>
                    <Option value="Brown">Brown</Option>
                    <Option value="Green">Green</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    xs: {
                      span: 24,
                      offset: 0,
                    },
                    sm: {
                      span: 16,
                      offset: 8,
                    },
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save Data
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeamanPersonalDetails;
