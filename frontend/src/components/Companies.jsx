import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/companies.css';
import ShowMoreText from 'react-show-more-text';
import { Button, Avatar, Rate, Form, Input, Empty } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Companies = () => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  const [clear, setClear] = useState(false);

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-companies/`
        );
        setCompanies(response.data);
        setAllCompanies(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllCompanies();
  }, [clear]);

  const onFinish = (values) => {
    const searchResult =
      values.search.trim() === ''
        ? allCompanies
        : allCompanies.filter((company) => {
            return company.company
              .toLowerCase()
              .includes(values.search.toLowerCase());
          });
    setCompanies(searchResult);
  };

  const handleClearSearch = () => {
    form.setFieldsValue({ search: '' });
    setClear(true);
    setCompanies(allCompanies);
  };

  const uniqueCountries = [
    ...new Set(allCompanies.map((company) => company.country)),
  ];

  const handleCountryClick = (e) => {
    const value = e.target.getAttribute('value');
    if (value === 'All countries') {
      return setCompanies(allCompanies);
    }
    setCompanies(
      allCompanies.filter(
        (company) => company.country.toLowerCase() === value.toLowerCase()
      )
    );
  };

  console.log();
  return (
    <>
      <div className="companies-container">
        <div className="side-bar">
          {' '}
          <Form
            form={form}
            name="basic"
            style={{
              maxWidth: 740,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="search"
              rules={[
                {
                  required: true,
                  message: 'Please enter company name!',
                },
              ]}
            >
              <Input placeholder="Company name" />
            </Form.Item>

            <Form.Item>
              <div className="side-bar-buttons">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
                <Button onClick={handleClearSearch}>Clear search</Button>
              </div>
            </Form.Item>
          </Form>
          <div className="countries-search">
            <center>
              <h3>Search by countries</h3>
            </center>
            <div className="countries-wrapper">
              <div className="all-countries">
                {' '}
                <Link
                  className="country-link"
                  value="All countries"
                  onClick={handleCountryClick}
                >
                  All Countries
                </Link>{' '}
                <p>{allCompanies.length}</p>
              </div>
              {uniqueCountries.map((country) => {
                // Use filter to get an array of companies with the same country
                const companiesWithSameCountry = allCompanies.filter(
                  (c) => c.country === country
                );

                return (
                  <div key={country} className="company-country">
                    <Link
                      className="country-link"
                      value={country}
                      onClick={handleCountryClick}
                    >
                      {country}
                    </Link>
                    <p>{companiesWithSameCountry.length}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="companies-list">
          {companies.length > 0 ? (
            <>
              {companies.map((company) => {
                return (
                  <div key={company._id} className="company-wrapper">
                    <div className="company-top">
                      <div className="company-top-left">
                        <div className="company-logo">
                          {' '}
                          <Avatar
                            shape="square"
                            size={120}
                            icon={<UserOutlined />}
                          />
                        </div>
                        <div className="company-details">
                          <h2>{company.company}</h2>

                          <div className="company-sub-details">
                            <p>
                              {company.user.charAt(0).toUpperCase() +
                                company.user.slice(1)}
                            </p>
                            <div className="sub-detail">
                              <p>Country</p>
                              <p>{company.country}</p>
                            </div>
                            <div className="sub-detail">
                              <p>Address</p>
                              <p>Test</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="company-top-right">
                        <Rate disabled defaultValue={4} />
                        <Button>secondary</Button>
                      </div>
                    </div>
                    <div className="company-bottom">
                      <div className="text-content">
                        <ShowMoreText
                          lines={3} // Number of lines to display before truncating
                          more="Show more" // Text for the "Show more" link
                          less="Show less" // Text for the "Show less" link
                          anchorClass="show-more-link" // CSS class for the link
                          expanded={false} // Whether the text should be initially expanded
                        >
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Quae saepe perferendis, autem quisquam eveniet
                          amet quas aperiam! A atque obcaecati saepe laudantium
                          reprehenderit mollitia, error nesciunt aut quaerat,
                          expedita odit! Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Recusandae, officiis mollitia
                          quibusdam, soluta nemo eos error illum id, distinctio
                          maiores voluptatem voluptates sapiente voluptate
                          explicabo unde tenetur expedita? Impedit, optio.
                        </ShowMoreText>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="no-companies">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 100,
                }}
                description={<span>No companies found...</span>}
              ></Empty>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Companies;
