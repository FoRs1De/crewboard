import { useState } from 'react';

import { message } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import ranksSelect from '../../../assets/ranksSelect';

import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
  AntDesignOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Upload,
  Button,
  Form,
  Input,
  Select,
  Modal,
  DatePicker,
  Space,
} from 'antd';
import axios from 'axios';

const SeamanPersonalDetails = ({ user, setSubmittedForm }) => {
  const { TextArea } = Input;
  const { Option } = Select;

  const [isOpen, setIsOpen] = useState(true);

  const handlePreview = async (file) => {
    const url = file.response.url;

    if (url) {
      Modal.success({
        footer: null,
        maskClosable: true,
        centered: true,
        icon: null,
        content: <img alt="Preview" src={url} style={{ width: '100%' }} />,
      });
    } else {
      console.log('File URL is missing.');
    }
  };
  const onSubmitGeneralInfo = (values) => {
    let photo;

    if (
      values.photo &&
      values.photo.file &&
      values.photo.file.response &&
      values.photo.file.response.url
    ) {
      photo = values.photo.file.response.url;
    } else {
      photo = user.photo;
    }
    let availability;
    if (values.availableFrom && values.availableFrom.$d) {
      availability = values.availableFrom.$d;
      availability = moment(availability).format('DD.MM.YYYY');
    } else {
      availability = null;
    }

    const dataToSend = {
      photo: photo,
      position: values.position,
      employmentStatus: values.employmentStatus,
      availableFrom: availability,
      desiredWage: {
        amount: values.wage.amount,
        currency: values.currency,
        period: values.wage.period,
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
    user.photo,
    user.position,
    user.employmentStatus,
    user.availableFrom,
    user.desiredWage,
  ];
  const isProfileComplete = status.every((item) => !!item);
  const isAtLeastOneComplete = status.some((item) => !!item);

  //transformed array for Position select field
  const transformedArray = ranksSelect.map((category) => {
    return {
      label: category.label,
      options: category.options.map((option) => ({
        label: option,
        value: option,
      })),
    };
  });

  const disabledDate = (current) => {
    // If the date is before today, disable it
    return current && current < moment().startOf('day');
  };

  const suffixSelector = (
    <Form.Item name="currency" noStyle>
      <Select
        style={{
          width: 50,
        }}
      >
        <Option value="$">$</Option>
        <Option value="€">€</Option>
      </Select>
    </Form.Item>
  );
  let jsDate;
  if (user.availableFrom) {
    jsDate = dayjs(user.availableFrom, 'DD.MM.YYYY');
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
            <h2>General information</h2>
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
              <div className="seaman-data-column-avatar">
                {' '}
                <Avatar
                  shape="square"
                  size={120}
                  icon={
                    user.photo ? (
                      <img src={user.photo} alt="Photo" />
                    ) : (
                      <AntDesignOutlined />
                    )
                  }
                  onClick={() => {
                    setIsOpen((prevState) => !prevState);
                  }}
                />
              </div>
              <div className="seaman-data-column">
                <div className="seaman-check-data">
                  <div className="status">
                    {user.position ? (
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
                      user.position ? 'check-data-ok' : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Position: </p>{' '}
                    <p>{user.position && user.position} </p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.employmentStatus ? (
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
                      user.employmentStatus ? 'check-data-ok' : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key"> Employment Status: </p>
                    <p>{user.employmentStatus && user.employmentStatus}</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.availableFrom ? (
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
                      user.availableFrom ? 'check-data-ok' : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">
                      Available for joining from:
                    </p>
                    <p> {user.availableFrom && user.availableFrom}</p>
                  </div>
                </div>
                <div className="check-data">
                  <div className="status">
                    {user.desiredWage.amount ? (
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
                      user.desiredWage.amount
                        ? 'check-data-ok'
                        : 'check-data-bad'
                    }
                  >
                    <p className="seaman-data-key">Desired Wage:</p>
                    <p>
                      {user.desiredWage.amount &&
                        user.desiredWage.amount +
                          user.desiredWage.currency +
                          ' / ' +
                          user.desiredWage.period}
                    </p>
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
                  photo: user.photo,
                  position: user.position,
                  employmentStatus: user.employmentStatus,
                  currency: '$',
                  wage: {
                    period: user.desiredWage.period
                      ? user.desiredWage.period
                      : 'per month',
                    amount: user.desiredWage.amount,
                  },
                  availableFrom: jsDate,
                }}
                onFinish={onSubmitGeneralInfo}
              >
                <Form.Item
                  label="Photo"
                  name="photo"
                  className="photo-upload"
                  valuePropName="logo"
                >
                  <Upload
                    action={`${
                      import.meta.env.VITE_API_URL
                    }/upload/seamen/photos`}
                    listType="picture-card"
                    accept=".jpg,.jpeg,.png"
                    onPreview={handlePreview}
                    multiple={false}
                    maxCount={1}
                    beforeUpload={(file) => {
                      const maxSize = 5 * 1024 * 1024;
                      if (file.size > maxSize) {
                        message.error(
                          'File size exceeds the maximum limit (5MB)'
                        );
                        return Upload.LIST_IGNORE; // Prevent the file from being uploaded
                      }
                      return true; // Allow the file to be uploaded
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                <div className="upload-description">
                  <p> Acceptable files: .jpg, .jpeg, .png</p>
                </div>
                <Form.Item name="position" label="Your Position">
                  <Select options={transformedArray} showSearch></Select>
                </Form.Item>
                <Form.Item name="employmentStatus" label="Employment Status">
                  <Select>
                    <Option value="Looking for a job">Looking for a job</Option>
                    <Option value="On vacation">On vacation</Option>
                    <Option value="At sea">At sea</Option>
                    <Option value="No longer working">No longer working</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="availableFrom"
                  label="Available for joining from"
                >
                  <DatePicker
                    allowEmpty
                    disabledDate={disabledDate}
                    placeholder="DD.MM.YYYY"
                    format="DD.MM.YYYY"
                  />
                </Form.Item>
                <Form.Item label="Desired Wage">
                  <Space.Compact>
                    <Form.Item
                      name={['wage', 'amount']}
                      noStyle
                      rules={[
                        {
                          message: 'Number is required',
                        },
                      ]}
                    >
                      <Input
                        placeholder="0"
                        addonAfter={suffixSelector}
                        style={{
                          width: '50%',
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={['wage', 'period']} noStyle>
                      <Select
                        placeholder="Period"
                        style={{
                          width: '35%',
                        }}
                      >
                        <Option value="day">per day</Option>
                        <Option value="month">per month</Option>
                        <Option value="year">per year</Option>
                      </Select>
                    </Form.Item>
                  </Space.Compact>
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
