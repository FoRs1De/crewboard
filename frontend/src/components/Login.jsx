import './styles/login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import postRequest from '../assets/axios';
import { useState } from 'react';

const Login = ({ setSubmittedForm }) => {
  const [form] = Form.useForm();
  const [responseError, setResponseError] = useState(null);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await postRequest('http://localhost:5000/login-user', values);
      document.querySelector('.login-form').reset();
      console.log(values);
      if (values.remember === true) {
        var maxAgeInSeconds = 30 * 24 * 60 * 60;
        document.cookie =
          'session=30 days; max-age=' + maxAgeInSeconds + '; path=/;';
        setSubmittedForm(true);
        navigate('/');
        setTimeout(() => {
          setSubmittedForm(false);
        }, 1);
      } else {
        document.cookie = 'session=1 session; path=/;';
        setSubmittedForm(true);
        navigate('/');
        setTimeout(() => {
          setSubmittedForm(false);
        }, 1);
      }
    } catch (error) {
      if (error.response.data.error === 'User not found') {
        form.setFieldsValue({ password: '', username: '' });
      } else {
        form.setFieldsValue({ password: '' });
      }
      setResponseError(error.response.data.error);
      console.error('Something went wrong', error.response.data.error);
    }
  };

  return (
    <div className="login-page">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        scrollToFirstError
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <center>
          <h1>Log in</h1>
        </center>
        <Space
          direction="vertical"
          style={{
            width: '100%',
            marginBottom: 20,
          }}
        >
          {responseError ? (
            <Alert message={responseError} type="error" showIcon closable />
          ) : null}
        </Space>
        <Form.Item
          name="username"
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/reset-password">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/registration">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
