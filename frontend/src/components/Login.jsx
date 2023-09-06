import './styles/login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import postRequest from '../assets/axios';
import { useState } from 'react';

const Login = () => {
  const [responseError, setResponseError] = useState(null);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log(values);
      await postRequest('http://localhost:5000/login-user', values);
      document.querySelector('.login-form').reset();
      navigate('/');
    } catch (error) {
      document.querySelector('.login-form').reset();
      setResponseError(error.response.data.error);
      console.error('Something went wrong', error.response.data.error);
    }
  };

  return (
    <div className="login-page">
      <Form
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
              required: true,
              message: 'Please input your Username!',
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
