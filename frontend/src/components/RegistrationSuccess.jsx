import { Button, Result } from 'antd';

const RegistrationSuccess = () => {
  return (
    <div className="registration-success-page">
      {' '}
      <Result
        status="success"
        title="You have been successfully registered!"
        subTitle="Please check your email for confirmation."
      />
    </div>
  );
};

export default RegistrationSuccess;
