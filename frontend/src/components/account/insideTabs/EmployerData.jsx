import { useState } from 'react';
import '../../styles/employerData.css';
import { message } from 'antd';
import countryList from '../../../assets/countries';

import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
  AntDesignOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Avatar, Upload, Button, Form, Input, Select, Modal } from 'antd';
import axios from 'axios';

const EmployerData = ({ user, setSubmittedForm, setVacancyPosted }) => {
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
  const onFinish = (values) => {
    let logoUrl;
    let licenseUrl;
    // Check if values.logo is defined and has a file response
    if (
      values.logo &&
      values.logo.file &&
      values.logo.file.response &&
      values.logo.file.response.url
    ) {
      logoUrl = values.logo.file.response.url;
    } else {
      logoUrl = user.logoUrl;
    }

    // Check if values.license is defined and has a file response
    if (
      values.license &&
      values.license.file &&
      values.license.file.response &&
      values.license.file.response.url
    ) {
      licenseUrl = values.license.file.response.url;
    } else {
      licenseUrl = user.licenseUrl;
    }

    const dataToSend = {
      logoUrl: logoUrl,
      licenseUrl: licenseUrl,
      address: values.address,
      city: values.city,
      contactPerson: values.contactPerson,
      country: values.country,
      description: values.description,
      licenseNumber: values.licenseNumber,
      phone: values.phone,
      website: values.website,
    };

    const putUpdateEmployerData = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/update-employer/`,
          dataToSend
        );
        setVacancyPosted((prev) => !prev);
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
    user.country,
    user.city,
    user.address,
    user.phone,
    user.website,
    user.licenseNumber,
    user.contactPerson,
    user.description,
  ];
  const isProfileComplete = status.every((item) => !!item);
  const isAtLeastOneComplete = status.some((item) => !!item);

  return (
    <>
      <div className="employer-data-container">
        <div className="employer-data-wrapper">
          <div className="employer-data-top">
            <div
              className="employer-data-top-left"
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
              <h2>Company Information</h2>
            </div>
            <div className="employer-data-top-right">
              {isProfileComplete ? (
                <p>Your profile is ok</p>
              ) : isAtLeastOneComplete ? (
                <p>Can be improved</p>
              ) : (
                <p>No data filled</p>
              )}
            </div>
          </div>
          <div className="employer-data-body">
            {isOpen ? (
              <div className="data-columns">
                <div className="data-column-avatar">
                  {' '}
                  <Avatar
                    shape="square"
                    size={120}
                    icon={
                      user.logoUrl ? (
                        <img src={user.logoUrl} alt="Logo" />
                      ) : (
                        <AntDesignOutlined />
                      )
                    }
                    onClick={() => {
                      setIsOpen((prevState) => !prevState);
                    }}
                  />
                </div>
                <div className="data-column">
                  <div className="check-data">
                    <div className="status">
                      {user.country ? (
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
                    <p
                      className={
                        user.country ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Country
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.city ? (
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
                    <p
                      className={user.city ? 'check-data-ok' : 'check-data-bad'}
                    >
                      City
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.address ? (
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
                    <p
                      className={
                        user.address ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Address
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.phone ? (
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
                    <p
                      className={
                        user.phone ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Phone Number
                    </p>
                  </div>
                </div>
                <div className="data-column">
                  {' '}
                  <div className="check-data">
                    <div className="status">
                      {user.website ? (
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
                    <p
                      className={
                        user.website ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Company Website
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.licenseNumber ? (
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
                    <p
                      className={
                        user.licenseNumber ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      License
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.contactPerson ? (
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
                    <p
                      className={
                        user.contactPerson ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Contact Person
                    </p>
                  </div>
                  <div className="check-data">
                    <div className="status">
                      {user.description ? (
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
                    <p
                      className={
                        user.description ? 'check-data-ok' : 'check-data-bad'
                      }
                    >
                      Company Description
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="employer-data-form">
                {' '}
                <Form
                  scrollToFirstError
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
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    phone: user.phone,
                    website: user.website,
                    licenseNumber: user.licenseNumber,
                    contactPerson: user.contactPerson,
                    description: user.description,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Company Logo"
                    name="logo"
                    className="licese-upload"
                    valuePropName="logo"
                  >
                    <Upload
                      action={`${
                        import.meta.env.VITE_API_URL
                      }/upload/companies/logos`}
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
                  <Form.Item name="country" label="Country">
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
                  <Form.Item name="contactPerson" label="Contact Person">
                    <Input />
                  </Form.Item>
                  <Form.Item name="website" label="Company Website">
                    <Input placeholder="https://company.com" />
                  </Form.Item>
                  <Form.Item name="licenseNumber" label="License Number">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="License"
                    name="license"
                    className="licese-upload"
                    valuePropName="license"
                  >
                    <Upload
                      action={`${
                        import.meta.env.VITE_API_URL
                      }/upload/companies/licenses`}
                      listType="picture-card"
                      accept=".jpg,.jpeg,.png,.pdf"
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
                    <p> Acceptable files: .jpg, .jpeg, .png, .pdf</p>
                  </div>
                  <Form.Item name="description" label="Company Description">
                    <TextArea
                      rows={4}
                      placeholder="Add any information about the your Company"
                    />
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
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerData;
