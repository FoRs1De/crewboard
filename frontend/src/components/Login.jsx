import './styles/login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Space, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import postRequest from '../assets/axios';
import { useState } from 'react';
const Login = ({ setSubmittedForm, userEmail, setUserEmail }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [valueEmail, setValueEmail] = useState('');
  const [responseError, setResponseError] = useState(null);
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const successMsg = () => {
    messageApi.open({
      type: 'success',
      content: `Email has been sent successfully to ${valueEmail}${userEmail}`,
      duration: 10,
    });
  };

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
      } else if (error.response.data.error === 'Not verified') {
        setValueEmail(values.username);
        setIsVerified(false);
        setIsAlertVisible(true);
        setUserEmail('');
        form.setFieldsValue({ password: '', username: '' });
      } else {
        form.setFieldsValue({ password: '' });
      }
      setResponseError(error.response.data.error);
      console.error('Something went wrong', error.response.data.error);
    }
  };

  const resendEmailHandler = async () => {
    const currentUrl = window.location.href;
    try {
      if (userEmail) {
        await postRequest('http://localhost:5000/resend-verification', {
          email: userEmail,
          url: currentUrl,
        });
        successMsg();
        setIsButtonDisabled(true);
        setIsAlertVisible(false);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 60000);
      } else if (valueEmail) {
        await postRequest('http://localhost:5000/resend-verification', {
          email: valueEmail,
          url: currentUrl,
        });
        successMsg();
        setIsButtonDisabled(true);
        setIsAlertVisible(false);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 60000);
      }
    } catch (error) {
      console.error('Something went wrong', error.response.data.error);
    }
  };
  return (
    <div className="login-page">
      {contextHolder}
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
        {isAlertVisible && userEmail ? (
          <Alert
            message={
              <center>
                {' '}
                <p>
                  <strong>
                    Please confirm your email to complete the process of
                    registration.
                  </strong>
                </p>
              </center>
            }
            description={
              <div>
                <br />
                <center>
                  <p>
                    The email has been sent to your designated address (
                    <strong>{userEmail}</strong>).
                  </p>{' '}
                </center>
                <br />
                <center>
                  <p>
                    {' '}
                    Kindly follow the link of our message to activate your
                    account. Check the Spam folder if the email is not in the
                    Inbox.
                  </p>
                </center>
                <center>
                  <p>
                    <br /> No Email? Please click
                    <>
                      <Button
                        disabled={isButtonDisabled}
                        onClick={resendEmailHandler}
                        type="link"
                      >
                        Resend Email
                      </Button>
                    </>
                  </p>
                </center>
              </div>
            }
            type="info"
          />
        ) : null}
        {isAlertVisible && !isVerified ? (
          <Alert
            message={
              <div>
                <center>
                  <p>
                    <strong>
                      Your account has been temporarily locked down because you
                      have not confirmed your email address.
                    </strong>
                  </p>
                </center>
              </div>
            }
            description={
              <div>
                <br />
                <center>
                  <p>
                    The email has been sent to your designated address (
                    <strong>{valueEmail}</strong>).
                  </p>{' '}
                </center>
                <br />
                <center>
                  <p>
                    Click the link in the email to come back to your account.
                    Don’t worry, we took care of it during your absence.
                  </p>
                </center>
                <center>
                  <p>
                    <br /> No Email? Please click{' '}
                    <>
                      <Button
                        disabled={isButtonDisabled}
                        onClick={resendEmailHandler}
                        type="link"
                      >
                        Resend Email
                      </Button>
                    </>
                  </p>
                </center>
              </div>
            }
            type="info"
          />
        ) : null}
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
