import './styles/seafarer.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Avatar, Rate, Form, Input, Empty, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Seafarer = ({ allSeamen }) => {
  const id = useParams().id;
  const [seaman, setSeaman] = useState({});

  useEffect(() => {
    if (allSeamen) {
      const foundSeaman = allSeamen.find((obj) => obj._id === id);
      setSeaman(foundSeaman);
    }
  }, [allSeamen, id]);

  return (
    <>
      <div className="seaman-page-container">
        <div className="seaman-content-header">
          <Breadcrumb
            className="bread-crumb"
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to="/seafarers">Seafarers</Link>,
              },
              {
                title: 'Seafarer',
              },
            ]}
          />
        </div>
        <div className="seaman-page-body">
          <div className="seaman-page-content">
            {seaman && seaman.personalDetails && (
              <div className="seaman-content-wrapper">
                <div className="seaman-content-top">
                  <h2>
                    {seaman.personalDetails && seaman.personalDetails.firstName}{' '}
                    {seaman.personalDetails && seaman.personalDetails.lastName}
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
                <hr className="seaman-hr" />
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
                <div className="seaman-sea-service">asdasd</div>
                <div className="seaman-content-bottom">
                  <p>On crewboard from:</p> <p>{seaman.registration}</p>
                </div>
              </div>
            )}
          </div>

          <div className="seaman-page-sidebar"></div>
        </div>
      </div>
    </>
  );
};

export default Seafarer;
