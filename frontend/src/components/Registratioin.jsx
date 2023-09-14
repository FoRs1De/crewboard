import './styles/registration.css';
import { useState } from 'react';
import postRequest from '../assets/axios';

import {
  AutoComplete,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  Alert,
  Space,
  Result,
} from 'antd';
const { Option } = Select;
import countryList from '../assets/countries.js';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';

const Registration = ({ setSubmittedForm, setUserEmail }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userType, setUserType] = useState('seaman');
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [responseError, setResponseError] = useState(null);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const handleSelectUserChange = (value) => {
    setUserType(value);
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Email already in use.',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please, complete captacha!',
    });
  };

  const onFinish = async (values) => {
    if (isCaptchaVerified) {
      const { confirm, ...valuesWithoutConfirm } = values;
      const currentURL = window.location.href;
      const valueWithUrl = { ...valuesWithoutConfirm, url: currentURL };

      try {
        await postRequest('http://localhost:5000/post-user', valueWithUrl);
        setFormIsSubmitted(true);
        setSubmittedForm(true);

        setUserEmail(valueWithUrl.email);
        navigate('/login');
        setSubmittedForm(false);
      } catch (error) {
        console.error('An error occurred during the POST request:', error);
        if (error.response.data.error === 'Email already in use') {
          errorMessage('Email already in use');
          setResponseError('Email already in use');
          form.setFieldsValue({
            email: '',
          });
        } else if (error.response.data.error === 'Company already in use') {
          setResponseError('Company already in use');
          form.setFieldsValue({
            company: '',
          });
        } else {
          setResponseError(
            'Internal server error, please contact administrator!'
          );
          form.setFieldsValue({
            password: '',
            user: '',
            company: '',
            country: '',
            website: '',
            email: '',
            confirm: '',
            agreement: '',
          });
        }
      }
    } else {
      warning();
    }
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      {formIsSubmitted ? (
        <div className="registration-success-page">
          <Result
            status="success"
            title="You have been successfully registered!"
            subTitle="Please check your email for confirmation."
          />
        </div>
      ) : (
        <div className="register-page">
          <Form
            form={form}
            name="register"
            className="register-form"
            onFinish={onFinish}
            scrollToFirstError
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <center>
              <h1> Registration</h1>
            </center>
            {responseError ? (
              <div className="error-message">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {' '}
                  <Alert
                    message={responseError}
                    type="error"
                    showIcon
                    closable
                  />
                </Space>
              </div>
            ) : null}
            <Form.Item
              name="user"
              label="Register as"
              rules={[
                {
                  required: true,
                  message: 'Please select!',
                },
              ]}
            >
              <Select
                placeholder="Select if you are seaman or employer"
                onChange={handleSelectUserChange}
              >
                <Option value="seaman">Seaman / Job seeker</Option>
                <Option value="crewing">Crewing compnay</Option>
                <Option value="owner">Ship owner / Ship operator</Option>
              </Select>
            </Form.Item>
            {userType === 'crewing' || userType === 'owner' ? (
              <>
                <Form.Item
                  name="company"
                  label="Company Name"
                  tooltip="Fill in with Company or Crewing name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your nickname!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: 'Please select!',
                    },
                  ]}
                >
                  <Select showSearch>
                    {countryList.map((country, index) => {
                      return (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Official Website"
                  rules={[
                    {
                      required: false,
                      message: 'Please input website!',
                    },
                  ]}
                >
                  <AutoComplete
                    options={websiteOptions}
                    onChange={onWebsiteChange}
                    placeholder="https://"
                  >
                    <Input />
                  </AutoComplete>
                </Form.Item>
              </>
            ) : null}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Should read and agree with Privacy policy')
                        ),
                },
              ]}
            >
              <Checkbox>
                I have read and agree with the{' '}
                <Link to="/privacy-policy" target="_Blank">
                  Privacy policy
                </Link>
                .
              </Checkbox>
            </Form.Item>
            <ReCAPTCHA
              className="captcha"
              sitekey="6LfXZfsnAAAAAIfP25irSYWTscKObKZT2k41hz5E"
              onChange={handleCaptchaChange}
            />

            <Form.Item>
              {contextHolder}
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default Registration;
