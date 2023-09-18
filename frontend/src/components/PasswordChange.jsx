import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Input, Result, Alert, Space } from 'antd';
import './styles/passwordReset.css';
import axios from 'axios';

const PasswordChange = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const id = useParams();

  const onFinish = async (value) => {
    try {
      await axios.put(`http://localhost:5001/password-reset/${id.id}`, value);
      document.querySelector('.reset-password-form').reset();
      setIsSubmitted(true);
    } catch (error) {
      setResponseError(error.response.data.error);
      console.log(error);
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
            <h1>Reset password</h1>
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
            name="password"
            label="New Password"
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
            label="Confirm New Password"
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
          <Form.Item>
            <div className="reset-password-button">
              <center>
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
          title={`Your password was successfully changed`}
          subTitle="Please login with your new password."
          extra={[
            <Link key="goLogin" to="/login">
              <Button type="primary">Go to login page</Button>
            </Link>,
          ]}
        />
      )}
    </div>
  );
};

export default PasswordChange;
