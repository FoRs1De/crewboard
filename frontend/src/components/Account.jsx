import './styles/account.css';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Alert, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = ({ setSubmittedForm, setUser }) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState('top');
  const [responseError, setResponseError] = useState(null);
  function handleScreenWidthChange() {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Check the screen width and perform actions based on it
    if (screenWidth >= 1200) {
      console.log('Large screen');
    } else if (screenWidth >= 768) {
      setMode('top');
      console.log('Medium screen');
    } else {
      setMode('left');

      console.log('Small screen');
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleScreenWidthChange);
    handleScreenWidthChange();
  }, []);

  //Settings tab
  const onFinishPassword = async (value) => {
    try {
      await axios.put(`http://localhost:5000/`, value);
      document.querySelector('.settings-reset-password-form').reset();
    } catch (error) {
      setResponseError(error.response.data.error);
      console.log(error);
    }
  };

  const onFinishEmail = async (value) => {
    try {
      await axios.put('http://localhost:5000/', value);
      document.querySelector('.reset-password-form').reset();
    } catch (error) {
      setResponseError(error.response.data.error);
      console.log(error);
    }
  };

  //Modal for delete confirmation
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content:
        'Please confirm if you want to delete your account. Your account will be deleted with all your personal data and you can not restore anything',
      centered: true,
      async onOk() {
        try {
          await axios.delete('http://localhost:5000/delete-user');
          document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          setUser(null);
          navigate('/');
        } catch (error) {
          setResponseError(error.response.data.error);
          console.log(error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="account-page">
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 100 + '%',
        }}
      >
        <Tabs.TabPane tab={<p className="tab-text">Vacncies</p>} key="1">
          content
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text"> CV </p>} key="2">
          asdsad
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text">Messages</p>} key="3">
          asdsad
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text">Settings</p>} key="4">
          <div className="settings-tab">
            <center>
              <h1>Settings</h1>
            </center>
            <div className="settings-forms">
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
                    {responseError ? (
                      <Alert message={responseError} type="error" showIcon />
                    ) : null}
                  </Space>
                  <Form.Item
                    name="email"
                    label="Enter your new email"
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
                          Save new Email
                        </Button>
                      </center>
                    </div>
                  </Form.Item>
                </Form>
              </div>
              <div className="delete-account">
                <center>
                  <h1>Delete Account</h1>
                  <p>Push the button to Delete your Crewell account forever.</p>
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
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text">Summary</p>} key="5">
          asdsad
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text">Feedback</p>} key="6">
          asdsad
        </Tabs.TabPane>
        <Tabs.TabPane tab={<p className="tab-text">Vacncies</p>} key="7">
          asdsad
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Account;
