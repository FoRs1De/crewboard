import './styles/seafarers.css';
import { Button, Avatar, Form, Input, Empty, Space } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ranks from '../assets/ranks';
const Seafarers = ({ seamen, setSeamen, allSeamen, setUpdateSeamen }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const searchResult =
      values.search.trim() === ''
        ? allSeamen
        : allSeamen.filter((seaman) => {
            return seaman.lastName
              .toLowerCase()
              .includes(values.search.toLowerCase());
          });
    setSeamen(searchResult);
  };

  const handleClearSearch = () => {
    form.setFieldsValue({ search: '' });
    setUpdateSeamen((prev) => !prev);
    setSeamen(allSeamen);
  };

  const calculateAge = (birthdate) => {
    const [day, month, year] = birthdate.split('.');
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <div className="seamen-container">
        <div className="seamen-side-bar">
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
                  message: 'Please enter seafarer name!',
                },
              ]}
            >
              <Input placeholder="Seafarer last name" />
            </Form.Item>

            <Form.Item>
              <div className="seamen-side-bar-buttons">
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
          {seamen.length > 0 ? (
            <>
              {seamen.map((seaman) => {
                return (
                  <div key={seaman._id} className="seaman-wrapper">
                    <div className="seaman-top">
                      <div className="seaman-top-left">
                        <h2>{seaman.position}</h2>
                      </div>
                      <div className="seaman-top-right">
                        <div className="seaman-age">
                          <p>Age</p>
                          <p>
                            {seaman.personalDetails.dateOfBirth &&
                              calculateAge(seaman.personalDetails.dateOfBirth)}
                          </p>
                        </div>
                        <div className="date-updated">
                          <p>Date updated:</p>
                          <p>{seaman.updated}</p>
                        </div>
                      </div>
                    </div>

                    <div className="seaman-info">
                      <div className="seaman-logo">
                        <div className="seaman-status">
                          {seaman.employmentStatus && seaman.employmentStatus}
                        </div>

                        <Space wrap size={16}>
                          <Link to={`/seafarers/${seaman._id}`}>
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
                          </Link>
                        </Space>
                        <div className="seaman-country">
                          <center>
                            <p>{seaman.personalDetails.cityzenship}</p>
                          </center>
                        </div>
                      </div>
                      <div className="seaman-service-records-">
                        <h3 className="seaman-service-h">
                          Last Sea Service records:
                        </h3>
                        {seaman.seaService &&
                          seaman.seaService.slice(0, 5).map((record) => {
                            return (
                              <div key={record.id} className="seaman-record">
                                <p>
                                  <strong>{record.position}:</strong>{' '}
                                  {record.vesselName} - {record.vesselType} /{' '}
                                  {record.signOnDate} - {record.signOffDate}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="seaman-bottom">
                      <div className="seman-bottom-left">
                        <Link to={`/seafarers/${seaman._id}`}>
                          Watch seaman details {'>'}
                        </Link>
                      </div>
                      <div className="seaman-bottom-right">
                        {' '}
                        Available from:{' '}
                        {seaman.availableFrom && seaman.availableFrom}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="seamen-no-vacancies">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 100,
                }}
                description={<span>No Seafarers found...</span>}
              ></Empty>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Seafarers;
