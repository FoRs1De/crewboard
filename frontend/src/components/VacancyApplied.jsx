import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Empty } from 'antd';
import './styles/vacancyApplied.css';

const VacancyApplied = () => {
  const id = useParams().id;
  const [seamenApplied, setSeamenApplied] = useState([]);
  useEffect(() => {
    const receiveCountVacancies = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/seamen-applied/${id}`)
        .then((response) => {
          setSeamenApplied(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    receiveCountVacancies();
  }, [id]);

  return (
    <div className="seamen-applied-container">
      <div className="seamen-applied-top">
        <Link className="back-link" to="/account">
          {'<'} Back to My Vacancies{' '}
        </Link>
      </div>
      <h2>Seafarers Applied for the Vacancy</h2>
      {seamenApplied.length !== 0 ? (
        seamenApplied.map((seaman) => {
          return (
            <div key={seaman._id} className="seaman-applied-page-content">
              {seaman && seaman.personalDetails && (
                <div className="seaman-content-wrapper">
                  <div className="seaman-content-top">
                    <h2>
                      {seaman.personalDetails &&
                        seaman.personalDetails.firstName}{' '}
                      {seaman.personalDetails &&
                        seaman.personalDetails.lastName}
                    </h2>
                    <div className="seaman-content-top-right">
                      <p> Date updated: </p> <p>{seaman.updated} </p>
                    </div>
                  </div>
                  <div className="seaman-content-header">
                    <div className="seaman-content-info">
                      <div className="seaman-info-key-value">
                        <p className="seaman-type">
                          {seaman.personalDetails.employmentStatus}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Rank:</p>
                        <p className="seaman-info-value">
                          <strong>{seaman.position}</strong>
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Date of birth:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.dateOfBirth}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Desired Wage:</p>
                        <p className="seaman-info-value">
                          {seaman.desiredWage.amount}
                          {seaman.desiredWage.currency} /
                          {seaman.desiredWage.period}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Phone:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.phone}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Email:</p>
                        <p className="seaman-info-value">{seaman.email}</p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Available from:</p>
                        <p className="seaman-info-value">
                          {seaman.availableFrom}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Employment status:</p>
                        <p className="seaman-info-value">
                          {seaman.employmentStatus}
                        </p>
                      </div>
                    </div>
                    <div className="seaman-info-logo">
                      <Avatar
                        shape="square"
                        size={120}
                        icon={
                          seaman.photo ? (
                            <img src={seaman.photo} alt="Photo" />
                          ) : (
                            <UserOutlined />
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="seaman-info-body">
                    <div className="seaman-info-column">
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Cityzenship:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.cityzenship}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Residence:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.residence}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">City:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.city}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Address:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.address}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Closest Airport:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.airport}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">English Level:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.englishLevel}
                        </p>
                      </div>
                    </div>
                    <div className="seaman-info-column">
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Hair Color:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.colorHair}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Eye Color:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.colorEye}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Height:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.height}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Weight:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.weight}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Shoe Size:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.sizeShoe}
                        </p>
                      </div>
                      <div className="seaman-info-key-value">
                        <p className="seaman-info-key">Overall Size:</p>
                        <p className="seaman-info-value">
                          {seaman.personalDetails.sizeOverall}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="seaman-hr" />
                  <div className="seaman-sea-service">
                    <strong>
                      <h3 className="seaman-service-records-h">
                        Sea Service records:
                      </h3>
                    </strong>
                    {seaman.seaService && (
                      <>
                        {seaman.seaService.map((record) => {
                          return (
                            <div key={record.id}>
                              <div className="service-record">
                                <div className="service-info-column">
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Position:
                                    </p>
                                    <p className="service-info-value">
                                      {record.position}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">Sign-on:</p>
                                    <p className="service-info-value">
                                      {record.signOnDate}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Vessel Type:
                                    </p>
                                    <p className="service-info-value">
                                      {record.vesselType}
                                    </p>
                                  </div>

                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Vessel Flag:
                                    </p>
                                    <p className="service-info-value">
                                      {record.vesselFlag}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">ME Type:</p>
                                    <p className="service-info-value">
                                      {record.mainEngineType}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Shipowner:
                                    </p>
                                    <p className="service-info-value">
                                      {record.shipOwner}
                                    </p>
                                  </div>
                                </div>
                                <div className="service-info-column">
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">Vessel:</p>
                                    <p className="service-info-value">
                                      {record.vesselName}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Sign-off:
                                    </p>
                                    <p className="service-info-value">
                                      {record.signOffDate}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Vessel DWT:
                                    </p>
                                    <p className="service-info-value">
                                      {record.vesselDWT}
                                    </p>
                                  </div>
                                  <div className="service-info-key-value">
                                    <p className="service-info-key">
                                      Year Built:
                                    </p>
                                    <p className="service-info-value">
                                      {record.vesselYearBuilt}
                                    </p>
                                  </div>

                                  <div className="service-info-key-value">
                                    <p className="service-info-key">ME kW:</p>
                                    <p className="service-info-value">
                                      {record.mainEngineKw}
                                    </p>
                                  </div>

                                  <div className="service-info-key-value">
                                    <p className="service-info-key">Crewing:</p>
                                    <p className="service-info-value">
                                      {record.crewing}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <hr className="service-records-line" />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="seaman-comment">
                    <h4>Comment to the Vacancy:</h4> {seaman.comment}
                  </div>
                  <div className="seaman-content-bottom">
                    <p>On crewboard from:</p> <p>{seaman.registration}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="seamen-no-vacancies">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 100,
            }}
            description={<span>No seamen applied yet...</span>}
          ></Empty>
        </div>
      )}
    </div>
  );
};

export default VacancyApplied;
