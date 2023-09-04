import './styles/registration.css';
import { useState } from 'react';
import {
  AutoComplete,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
} from 'antd';
const { Option } = Select;
import countryList from '../assets/countries.js';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate, Link } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('seaman');
  const [country, setCountry] = useState('');
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSelectUserChange = (value) => {
    setUserType(value);
  };

  const handleSelectCountryChange = (value) => {
    setCountry(value);
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Succesfully registered',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please complete captcha!',
    });
  };

  const onFinish = (values) => {
    if (isCaptchaVerified) {
      console.log('Received values of form: ', values);
      document.querySelector('.register-form').reset();
      success();
      setTimeout(() => navigate('/registration-success'), 2000);
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
    <div className="register-page">
      <Form
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
              name="compnay"
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
              <Select onChange={handleSelectCountryChange} showSearch>
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
                  new Error('The new password that you entered do not match!')
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
  );
};

export default Registration;
