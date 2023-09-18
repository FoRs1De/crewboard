import '../../styles/settings.css';

import { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Alert, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = ({ setSubmittedForm, setUser }) => {
  const navigate = useNavigate();
  const [responseEmailChange, setResponseEmailChange] = useState(null);
  const [responsePasswordChange, setResponsePasswordChange] = useState(null);
  const [responseDeleteUser, setResponseDeleteUser] = useState(null);

  //Settings tab
  const onFinishPassword = async (value) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/password-change`, value);
      document.querySelector('.settings-reset-password-form').reset();
      setResponsePasswordChange('Password changed successfully');
      setTimeout(() => {
        setResponsePasswordChange(null);
      }, 10000);
    } catch (error) {
      setResponsePasswordChange(error.response.data.error);
      setTimeout(() => {
        setResponseEmailChange(null);
      }, 10000);
      console.log(error);
    }
  };

  const onFinishEmail = async (value) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/email-change`, value);
      document.querySelector('.reset-password-form').reset();
      setResponseEmailChange('Email changed successfully');
      setTimeout(() => {
        setResponseEmailChange(null);
      }, 10000);
    } catch (error) {
      setResponseEmailChange(error.response.data.error);
      setTimeout(() => {
        setResponseEmailChange(null);
      }, 10000);
      console.log(error);
    }
  };

  //Modal for delete confirmation inside of settings tab
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content:
        'Please confirm if you want to delete your account. Your account will be deleted with all your personal data and you can not restore anything',
      centered: true,
      async onOk() {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/delete-user`);
          document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          setUser(null);
          navigate('/');
        } catch (error) {
          setResponseDeleteUser(error.response.data.error);
          setTimeout(() => {
            setResponseDeleteUser(null);
          }, 10000);
          console.log(error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <div className="settings-tab">
        <div className="settings-forms">
          <div className="change-email">
            {' '}
            <Form
              name="changeEmail"
              className="reset-password-form"
              onFinish={onFinishEmail}
              scrollToFirstError
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <center>
                <h1>Change Email / Login</h1>
              </center>
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  marginBottom: 20,
                }}
              >
                {responseEmailChange !== null && (
                  <Alert
                    message={responseEmailChange}
                    type={
                      responseEmailChange === 'Email changed successfully'
                        ? 'success'
                        : 'error'
                    }
                    showIcon
                  />
                )}
              </Space>
              <Form.Item
                name="email"
                label="Enter your new email"
                hasFeedback
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
                name="confirm"
                label="Confirm New Email"
                dependencies={['email']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your email!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('email') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Emails are not matching')
                      );
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="reset-password-button">
                  <center>
                    <Button type="primary" htmlType="submit">
                      Save new Email
                    </Button>
                  </center>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="settings-reset-password">
            <Form
              name="changePassword"
              className="settings-reset-password-form"
              onFinish={onFinishPassword}
              scrollToFirstError
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <center>
                <h1>Change Password</h1>
              </center>
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  marginBottom: 20,
                }}
              >
                {responsePasswordChange !== null && (
                  <Alert
                    message={responsePasswordChange}
                    type={
                      responsePasswordChange === 'Password changed successfully'
                        ? 'success'
                        : 'error'
                    }
                    showIcon
                  />
                )}
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
              <Form.Item>
                <div className="reset-password-button">
                  <center>
                    <Button type="primary" htmlType="submit">
                      Save new password
                    </Button>
                  </center>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="delete-account">
            <center>
              <h1>Delete Account</h1>
              <p>Push the button to Delete your Crewboard account forever.</p>
            </center>
            <Space
              direction="vertical"
              style={{
                width: '100%',
                marginBottom: 20,
              }}
            >
              {responseDeleteUser ? (
                <Alert message={responseDeleteUser} type="error" showIcon />
              ) : null}
            </Space>
            <div className="reset-password-button">
              <center>
                <Button danger htmlType="submit" onClick={showConfirm}>
                  Delete Account
                </Button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
