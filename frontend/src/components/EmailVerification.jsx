import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import './styles/passwordReset.css';
import axios from 'axios';

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [response, setResponse] = useState(null);
  const token = useParams();

  // useEffect(() => {
  //   if (token) {
  //     const verfication = async () => {
  //       try {
  //         await axios.put(
  //           `${import.meta.env.VITE_API_URL}/email-verification/${token.token}`
  //         );
  //         setIsVerified(true);
  //       } catch (error) {
  //         setResponseError(error.response.data.error);
  //         console.log(error);
  //       }
  //     };

  //     verfication();
  //   }
  // }, [token]);

  const handleVerification = () => {
    if (token) {
      const verfication = async () => {
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/email-verification/${token.token}`
          );
          setIsVerified(true);
          setResponse('Successfully verified!');
        } catch (error) {
          setIsVerified(true);
          setResponse(error.response.data.error);
          console.log(error);
        }
      };
      verfication();
    }
  };

  return (
    <>
      {!isVerified ? (
        <div className="registration-success-page">
          <Result
            title="Verify your Email by pressing button below"
            extra={[
              <Button onClick={handleVerification} type="primary" key="console">
                Verify your email
              </Button>,
            ]}
          />
        </div>
      ) : (
        <div className="registration-success-page">
          <Result
            status={
              response === 'Successfully verified!' ? 'success' : 'warning'
            }
            title={
              response !== 'Successfully verified!'
                ? 'There are some problems with your operation.'
                : 'Your email successfully verified!'
            }
            subTitle={
              response === 'Successfully verified!'
                ? 'Now you can login with your email and password'
                : `${response}. Please contact administrtor!`
            }
            extra={
              response !== 'Successfully verified!' ? (
                <Link key="1" to="/account">
                  <Button type="primary" key="console">
                    Contact administrator
                  </Button>
                </Link>
              ) : (
                <Link key="1" to="/login">
                  <Button type="primary" key="console">
                    To login
                  </Button>
                </Link>
              )
            }
          />
        </div>
      )}
    </>
  );
};

export default EmailVerification;
