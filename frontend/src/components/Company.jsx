import './styles/company.css';
import { Button, Avatar, Rate, Form, Input, Empty, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Company = () => {
  const id = useParams().id;
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/company/${id}`
        );
        setCompany(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCompany();
  }, [id]);

  return (
    <>
      <div className="company-page-container">
        <div className="content-header">
          <Breadcrumb
            className="bread-crumb"
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to="/companies">Companies</Link>,
              },
              {
                title: 'Company',
              },
            ]}
          />
        </div>
        <div className="company-page-body">
          <div className="company-page-content">
            <div className="company-content-wrapper">
              <div className="company-content-top">
                <h2>{company.company}</h2>
                <div className="rating">
                  <Rate defaultValue={4} />
                </div>
              </div>
              <div className="company-content-header">
                <div className="company-content-info">
                  <div className="company-info-key-value">
                    <p className="company-type">{company.user}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Country:</p>
                    <p className="company-info-value">{company.country}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">City:</p>
                    <p className="company-info-value">{company.city}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Address:</p>
                    <p className="company-info-value">{company.address}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Email:</p>
                    <p className="company-info-value">{company.email}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Phone:</p>
                    <p className="company-info-value">{company.phone}</p>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Website:</p>
                    <a className="company-info-value">{company.website}</a>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">License:</p>
                    <Link to={company.licenseUrl}>
                      <p className="company-info-value">
                        {company.licenseNumber}
                      </p>
                    </Link>
                  </div>
                  <div className="company-info-key-value">
                    <p className="company-info-key">Contact Person:</p>
                    <p className="company-info-value">
                      {company.contactPerson}
                    </p>
                  </div>
                </div>
                <div className="company-info-logo">
                  {' '}
                  <Avatar
                    shape="square"
                    size={120}
                    icon={
                      company.logoUrl ? (
                        <img src={company.logoUrl} alt="Logo" />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                </div>
              </div>
              <div className="company-crewboard-info">
                <div className="company-info-key-value">
                  <p className="company-info-key">On Crewboard:</p>
                  <p className="company-info-value">
                    from {company.registration}
                  </p>
                </div>
                <div className="company-info-key-value">
                  <p className="company-info-key">Posted Vacancies:</p>
                  <p className="company-info-value">
                    {company.postedVacancies && company.postedVacancies.length}{' '}
                    on Crewboard
                  </p>
                </div>
              </div>
              <div className="company-page-description">
                <h4>Company description:</h4>
                <p>{company.description}</p>
              </div>
            </div>
          </div>
          <div className="company-page-sidebar"></div>
        </div>
      </div>
    </>
  );
};

export default Company;
