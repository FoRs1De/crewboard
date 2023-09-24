import { useState, useEffect } from 'react';
import { Button, Avatar, Rate, Form, Input, Empty, Space } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles/vacancies.css';
import axios from 'axios';

const Vacancies = () => {
  const [form] = Form.useForm();
  const [clear, setClear] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [allVacancies, setAllVacancies] = useState([]);

  const onFinish = (values) => {
    const searchResult =
      values.search.trim() === ''
        ? allVacancies
        : allVacancies.filter((vacancy) => {
            return vacancy.position
              .toLowerCase()
              .includes(values.search.toLowerCase());
          });
    setVacancies(searchResult);
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-vacancies/`
        );
        const reversedResponse = response.data.reverse();
        setVacancies(reversedResponse);
        setAllVacancies(reversedResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllCompanies();
  }, [clear]);

  const handleClearSearch = () => {
    form.setFieldsValue({ search: '' });
    setClear(true);
    setVacancies(allVacancies);
  };

  console.log(vacancies);
  return (
    <>
      <div className="vacancies-container">
        <div className="vacancies-side-bar">
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
              <Input placeholder="Enter position" />
            </Form.Item>

            <Form.Item>
              <div className="vacancies-side-bar-buttons">
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
        </div>
        <div className="vacancies-list">
          {vacancies.length > 0 ? (
            <>
              {vacancies.map((vacancy) => {
                return (
                  <div key={vacancy._id} className="vacancy-wrapper">
                    <div className="vacancy-top">
                      <h2>{vacancy.position}</h2>
                      <div className="vacancy-posted">{vacancy.timeStamp}</div>
                    </div>

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
                          <Space wrap size={16}>
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
                          </Space>
                        </div>
                        <div className="company-country">
                          <p>{vacancy.userCountry}</p>
                        </div>
                      </div>
                    </div>
                    <div className="vacancy-bottom">
                      <div className="vacnct-bottom-left">
                        <Link to={`${vacancy._id}`}>
                          Details and apply {'>'}{' '}
                        </Link>
                      </div>
                      <div className="vacnct-bottom-right">
                        Views: {vacancy.viewed}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="no-vacancies">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 100,
                }}
                description={<span>No vacancies found...</span>}
              ></Empty>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Vacancies;
