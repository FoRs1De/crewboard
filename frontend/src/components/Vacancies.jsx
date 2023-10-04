import { Button, Avatar, Form, Input, Empty, Space } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import './styles/vacancies.css';

import ranks from '../assets/ranks';

const Vacancies = ({
  countVacancies,
  setCountVacancies,
  allVacancies,
  setClear,
  vacancies,
  setVacancies,
}) => {
  const [form] = Form.useForm();

  if (countVacancies === 0) {
    setCountVacancies((prev) => !prev);
  }

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

  const handleVacancyClick = (e) => {
    const value = e.currentTarget.getAttribute('value');
    if (value === 'Shipowner company') {
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return value.includes(vacancy.userRole);
      });
      setVacancies(filteredVacancies);
    } else if (value === 'other') {
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return ranks[2].OTHER.includes(vacancy.position);
      });
      setVacancies(filteredVacancies);
    } else {
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return value.includes(vacancy.position);
      });
      setVacancies(filteredVacancies);
    }
  };

  const handleClearSearch = () => {
    form.setFieldsValue({ search: '' });
    setClear(true);
    setVacancies(allVacancies);
  };

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
          <div className="ranks-wrapper">
            <div className="ranks-vacancies">
              <div className="ranks-left-list">
                <Link
                  value="Master"
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.masters} />
                  </p>
                  <p>Masters</p>
                </Link>
                <Link
                  value="Chief Officer"
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.chiefOfficers} />
                  </p>
                  <p> Chief Officers</p>
                </Link>
                <Link
                  value={[
                    'Single Officer',
                    '2nd Officer',
                    '3rd Officer',
                    'Trainee Officer',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.watchOfficers} />
                  </p>
                  <p> Watch Officers</p>
                </Link>
                <Link
                  value={[
                    'Bosun (Boatswain)',
                    'Pumpman',
                    'AB (Able Seaman)',
                    'AB/Welder',
                    'OS (Ordinary Seaman)',
                    'Deck Cadet',
                    'Cadet/Trainee',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.deckRatings} />
                  </p>
                  <p> Deck Ratings</p>
                </Link>
                <Link
                  value={[
                    'Chief Cook',
                    'Cook',
                    '2nd Cook',
                    'Messboy',
                    'AB/Cook',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.galley} />
                  </p>
                  <p>Galley</p>
                </Link>
                <Link
                  value="Shipowner company"
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.fromShipowners} />
                  </p>
                  <p>From Shipowners</p>
                </Link>
              </div>
              <div className="ranks-right-list">
                <Link
                  value={[
                    'Chief Engineer',
                    'Single Engineer',
                    'Superintendent',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.chiefEngineers} />
                  </p>
                  <p>Chief Engineers</p>
                </Link>
                <Link
                  value="2nd Engineer"
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.secondEngineers} />
                  </p>
                  <p>Second Engineers</p>
                </Link>
                <Link
                  value={[
                    '3rd Engineer',
                    '4th Engineer',
                    'Watch Engineer',
                    'Ref. Engineer',
                    'Gas Engineer',
                    'Trainee Engineer',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.engineers} />
                  </p>
                  <p>Engineers</p>
                </Link>
                <Link
                  value={[
                    'Electrical Engineer',
                    'ETO',
                    'Electrician',
                    'Assistant Electrical Engineer',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.electricalEngineers} />
                  </p>
                  <p>Electrical Engineers</p>
                </Link>
                <Link
                  value={[
                    'Motorman/Oiler',
                    'Wiper',
                    'Motorman/Electrician',
                    'AB/MM',
                    'Engine Cadet',
                    'Fitter/Welder',
                    'Turner',
                  ]}
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.engineRatings} />
                  </p>
                  <p>Engine Ratings</p>
                </Link>
                <Link
                  value="other"
                  onClick={handleVacancyClick}
                  className="ranks-item"
                >
                  <p className="count-vacancies">
                    <CountUp end={countVacancies.other} />
                  </p>
                  <p>Other ranks</p>
                </Link>
              </div>
            </div>
          </div>
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
