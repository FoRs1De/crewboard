import './styles/login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'You are logged in',
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
      content: 'This is a warning message',
    });
  };

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    document.querySelector('.login-form').reset();
    setTimeout(() => navigate('/'), 1000);
    success();
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
            placeholder="Username"
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
          {contextHolder}
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Space>
          Or <Link to="/registration">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
