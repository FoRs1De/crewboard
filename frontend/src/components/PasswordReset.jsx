import { Button, Form, Input } from 'antd';
import './styles/PasswordReset.css';
const PasswordReset = () => {
  const onFinish = (values) => {
    if (isCaptchaVerified) {
      console.log('Received values of form: ', values);
      document.querySelector('.register-form').reset();

      setTimeout(() => navigate('/registration-success'), 2000);
    } else {
      console.log('test');
    }
  };
  return (
    <div className="reset-password-page">
      <Form
        name="resetPassword"
        className="reset-password-form"
        onFinish={onFinish}
        scrollToFirstError
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <center>
          <h1>Reset Password</h1>
        </center>

        <Form.Item
          name="email"
          label="Your E-mail"
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
    </div>
  );
};

export default PasswordReset;
