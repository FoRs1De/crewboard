import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Result } from 'antd';
import './styles/PasswordReset.css';

const PasswordReset = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const onFinish = (value) => {
    console.log(value);
    document.querySelector('.reset-password-form').reset();
    setEmail(value);
    setIsSubmitted(true);
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

export default PasswordReset;
