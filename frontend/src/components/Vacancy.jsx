import { Breadcrumb, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles/vacancy.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Vacancy = () => {
  const id = useParams().id;
  const [vacancy, setVacancy] = useState([]);

  useEffect(() => {
    const getVacancy = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/vacancy/${id}`
        );
        setVacancy(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVacancy();
  }, [id]);

  console.log(vacancy);

  return (
    <>
      <div className="vacancy-container">
        <div className="content-header">
          <Breadcrumb
            className="bread-crumb"
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to="/vacancies">Vacancies</Link>,
              },
              {
                title: 'Vacancy',
              },
            ]}
          />
        </div>
        <div className="vacancy-body">
          <div className="vacancy-content">
            <div className="vacancy-wrapper">
              {vacancy.wage && (
                <>
                  {' '}
                  <div className="vacancy-top">
                    <h2>{vacancy.position}</h2>
                    <div className="vacancy-posted">{vacancy.timeStamp}</div>
                  </div>
                  <div className="vacancy-content-info">
                    <div className="vacancy-info">
                      <div className="info-keys">
                        <div className="key-value">
                          <p className="left-key">Wage:</p>
                          <p className="right-value">
                            {vacancy.wage.amount} {vacancy.suffix} /{' '}
                            {vacancy.wage.period}
                          </p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Vessel type:</p>
                          <p className="right-value">{vacancy.vesselType}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Start date:</p>
                          <p className="right-value">{vacancy.embarkation}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Contract duration:</p>
                          <p className="right-value">
                            {vacancy.duration.number} {vacancy.duration.period}
                          </p>
                        </div>
                      </div>
                      <div className="company-info">
                        <div className="company-logo">
                          <Avatar
                            shape="square"
                            size={120}
                            icon={
                              vacancy.userLogoUrl ? (
                                <img src={vacancy.userLogoUrl} alt="Logo" />
                              ) : (
                                <UserOutlined />
                              )
                            }
                          />
                        </div>
                        <div className="company-country">
                          <p>{vacancy.userCountry}</p>
                        </div>
                      </div>
                    </div>
                    <div className="key-value-cityzenship">
                      <p className="left-key-cityzenship">
                        Seaman Citizenship:
                      </p>
                      <div className="right-value-cityzenship">
                        {vacancy.citizenship.map((nationality, index) => {
                          return (
                            <div className="nationalities" key={nationality}>
                              <p>{nationality}</p>
                              {index < vacancy.citizenship.length - 1 && (
                                <span>,</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <hr />
                    <div className="vessel-info">
                      <div className="vessel-info-left">
                        <div className="key-value">
                          <p className="left-key">Vessel Name:</p>
                          <p className="right-value">{vacancy.vesselName}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Vessel Flag:</p>
                          <p className="right-value">{vacancy.vesselFlag}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Vessel Owner:</p>
                          <p className="right-value">{vacancy.vesselOwner}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Trading Region:</p>
                          <p className="right-value">{vacancy.tradingRegion}</p>
                        </div>
                      </div>
                      <div className="vessel-info-right">
                        <div className="key-value">
                          <p className="left-key">Vessel DWT:</p>
                          <p className="right-value">{vacancy.vesselDWT}</p>
                        </div>

                        <div className="key-value">
                          <p className="left-key">Vessel ME Type:</p>
                          <p className="right-value">
                            {vacancy.mainEngineType}
                          </p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Maine Engine, kW:</p>
                          <p className="right-value">{vacancy.mainEngineKw}</p>
                        </div>
                        <div className="key-value">
                          <p className="left-key">Vessel Year Built:</p>
                          <p className="right-value">{vacancy.yearBuilt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="vacancy-content-bottom">
                      <p>Viewed: {vacancy.viewed}</p>
                    </div>
                  </div>{' '}
                </>
              )}
            </div>
          </div>
          <div className="vacancy-sidebar">sadasd</div>
        </div>
      </div>
    </>
  );
};

export default Vacancy;
