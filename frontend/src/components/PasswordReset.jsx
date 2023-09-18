import { useState } from 'react';
import { Button, Form, Input, Result, Alert, Space, message } from 'antd';
import './styles/passwordReset.css';
import postRequest from '../assets/axios';

const PasswordReset = ({ setSubmittedForm }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [responseError, setResponseError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: responseError,
    });
  };

  const onFinish = async (value) => {
    try {
      const currentURL = window.location.href;
      const valueWithUrl = { ...value, url: currentURL };
      await postRequest('http://localhost:5001/password-reset', valueWithUrl);
      document.querySelector('.reset-password-form').reset();
      setIsSubmitted(true);
      setSubmittedForm(true);
      setEmail(value);
    } catch (error) {
      setResponseError(error.response.data.error);
      console.log(error);
      errorMessage();
    }
  };

  return (
    <div className="reset-password-page">
      {!isSubmitted ? (
        <Form
          name="resetPassword"
          className="reset-password-form"
          onFinish={onFinish}
          scrollToFirstError
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <center>
            <h1>Request password reset</h1>
          </center>
          <Space
            direction="vertical"
            style={{
              width: '100%',
              marginBottom: 20,
            }}
          >
            {responseError ? (
              <Alert message={responseError} type="error" showIcon />
            ) : null}
          </Space>
          <Form.Item
            name="email"
            label="Enter your email. A link for reset will be sent."
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
          <Form.Item>
            <div className="reset-password-button">
              <center>
                {contextHolder}
                <Button type="primary" htmlType="submit">
                  Reset Password
                </Button>
              </center>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title={`Email with instructions has been sent to ${email.email}`}
          subTitle="Please check your email and follow the instructions to reset password."
          extra={[]}
        />
      )}
    </div>
  );
};

export default PasswordReset;
