import { useState } from 'react';
import '../../styles/employerData.css';
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';

const EmployerData = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);

  //Check Status of profile completion
  const status = [
    user.country,
    user.city,
    user.address,
    user.phone,
    user.website,
    user.license,
    user.contactPerson,
    user.description,
  ];
  const isProfileComplete = status.every((item) => !!item);
  const isAtLeastOneComplete = status.some((item) => !!item);

  return (
    <>
      <div className="employer-data-container">
        <div className="employer-data-wrapper">
          <div className="employer-data-top">
            <div
              className="employer-data-top-left"
              onClick={() => {
                setIsOpen((prevState) => !prevState);
              }}
            >
              {!isOpen ? (
                <CloseCircleOutlined
                  style={{ fontSize: '26px', cursor: 'pointer' }}
                />
              ) : (
                <EditOutlined style={{ fontSize: '26px', cursor: 'pointer' }} />
              )}{' '}
              <h2>Company Information</h2>
            </div>
            <div className="employer-data-top-right">
              {isProfileComplete ? (
                <p>Your profile is ok</p>
              ) : isAtLeastOneComplete ? (
                <p>Can be improved</p>
              ) : (
                <p>No data filled</p>
              )}
            </div>
          </div>
          <div className="employer-data-body">
            <div className="data-column">
              <div className="check-data">
                <div className="status">
                  {user.country ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={user.country ? 'check-data-ok' : 'check-data-bad'}
                >
                  Country
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.city ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p className={user.city ? 'check-data-ok' : 'check-data-bad'}>
                  City
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.address ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={user.address ? 'check-data-ok' : 'check-data-bad'}
                >
                  Address
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.phone ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p className={user.phone ? 'check-data-ok' : 'check-data-bad'}>
                  Phone Number
                </p>
              </div>
            </div>
            <div className="data-column">
              {' '}
              <div className="check-data">
                <div className="status">
                  {user.website ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={user.website ? 'check-data-ok' : 'check-data-bad'}
                >
                  Company Website
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.license ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={user.license ? 'check-data-ok' : 'check-data-bad'}
                >
                  License
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.contactPerson ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={
                    user.contactPerson ? 'check-data-ok' : 'check-data-bad'
                  }
                >
                  Contact Person
                </p>
              </div>
              <div className="check-data">
                <div className="status">
                  {user.description ? (
                    <CheckCircleOutlined
                      style={{
                        fontSize: '18px',
                        color: '#6BC259',
                        marginTop: 5,
                      }}
                    />
                  ) : (
                    <FormOutlined
                      style={{
                        fontSize: '18px',
                        color: '#b4c5d5',
                        marginTop: 5,
                      }}
                    />
                  )}
                </div>
                <p
                  className={
                    user.description ? 'check-data-ok' : 'check-data-bad'
                  }
                >
                  Compant Description
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerData;
