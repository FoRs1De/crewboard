import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import '../../styles/userVacancies.css';
import ranksSelect from '../../../assets/ranksSelect';
import countryList from '../../../assets/countries';
import shipTypes from '../../../assets/shipTypes';
import flagStates from '../../../assets/flagStates';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  message,
  Empty,
  Avatar,
  Modal,
} from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';
import axios from 'axios';

const Vacancies = ({
  user,
  vacancies,
  setVacancyPosted,
  setSubmittedForm,
  setLoadVacancies,
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const [showAddVacancyForm, setShowAddVacancieForm] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const successMsgPostVacancy = () => {
    messageApi.open({
      type: 'success',
      content: 'Vacancy seccessfully posted',
      duration: 10,
    });
  };

  const successMsgDeleteVacancy = () => {
    messageApi.open({
      type: 'success',
      content: 'Vacancy seccessfully deleted',
      duration: 10,
    });
  };

  const successMsgCancelApplyVacancy = () => {
    messageApi.open({
      type: 'success',
      content: 'Applying succesfully cancelled',
      duration: 10,
    });
  };

  const errorMsg = () => {
    messageApi.open({
      type: 'error',
      content: responseMsg,
      duration: 10,
    });
  };

  const handleAddVacancy = () => {
    setShowAddVacancieForm(true);
  };

  const handleGoBack = () => {
    setShowAddVacancieForm(false);
  };

  //transformed array for Position select field
  const transformedArray = ranksSelect.map((category) => {
    return {
      label: category.label,
      options: category.options.map((option) => ({
        label: option,
        value: option,
      })),
    };
  });

  const selectNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 50,
        }}
      >
        <Option value="$">$</Option>
        <Option value="€">€</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (fieldsValue) => {
    let embarkationDate = fieldsValue.startDate.$d;
    embarkationDate = moment(embarkationDate).format('DD.MM.YYYY');

    const currentDate = moment().utc().format('DD MMM YYYY, hh:mm [GMT]');
    let logoUrl;
    if (user.logoUrl) {
      logoUrl = user.logoUrl;
    }
    const modifiedValues = {
      ...fieldsValue,
      embarkation: embarkationDate,
      timeStamp: currentDate,
      company: user.company,
      userRole: user.user,
      createdById: user._id,
      userLogoUrl: logoUrl,
      seamenApplied: [],
    };
    setVacancyPosted((prev) => !prev);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-vacancy`,
        modifiedValues
      );
      console.log(response);
      if (response.data.message === 'Vacancy posted') {
        setVacancyPosted((prev) => !prev);
        setShowAddVacancieForm((prev) => !prev);
        successMsgPostVacancy();
        setLoadVacancies((prev) => !prev);
      }
    } catch (error) {
      setResponseMsg(error.message);
      errorMsg();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelApplying = (e) => {
    const value = e.currentTarget.value;
    const vacancyId = { vacancyId: value };
    showModal();
    const applyRemove = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/remove-apply-vacancy`,
          vacancyId
        );
        handleCancel();
        successMsgCancelApplyVacancy();
        setVacancyPosted((prev) => !prev);
        setSubmittedForm((prev) => !prev);
      } catch (error) {
        console.error(error.message);
      }
    };
    Modal.confirm({
      centered: true,
      title: 'Confirmation required',
      content: 'Are you sure you want to cancel appliying the vacancy?',
      onOk: applyRemove,
      onCancel: handleCancel,
    });
  };

  function disabledDate(current) {
    // If the date is before today, disable it
    return current && current < moment().startOf('day');
  }

  const handleDeleteVacancy = async (id) => {
    const vacancyId = { id: id };
    showModal();
    const deleteVacancy = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/delete-vacancy`,
          vacancyId
        );
        if (response.data === 'Successfully deleted') {
          handleCancel();
          setVacancyPosted((prev) => !prev);
          successMsgDeleteVacancy();
          setLoadVacancies((prev) => !prev);
        }
      } catch (error) {
        setResponseMsg(error.message);
        errorMsg();
      }
    };
    Modal.confirm({
      centered: true,
      title: 'Confirmation required',
      content: 'Are you sure you want to delete the Vacancy?',
      onOk: deleteVacancy,
      onCancel: handleCancel,
    });
  };

  return (
    <>
      {contextHolder}
      {user && (
        <>
          {user.user !== 'seaman' ? (
            /* IF USER IS EMPLOYER */
            <div>
              {showAddVacancyForm ? (
                <div className="add-vacancy">
                  <div className="go-back">
                    <Button onClick={handleGoBack} type="link">
                      {'<'} Go Back
                    </Button>
                  </div>
                  <div className="add-vacancy-form">
                    <Form
                      scrollToFirstError
                      labelCol={{
                        span: 24,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      layout="vertical"
                      style={{
                        maxWidth: 400,
                      }}
                      initialValues={{
                        suffix: '$',
                        citizenship: ['Any Citizenship'],
                      }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="position"
                        label="Position"
                        rules={[
                          {
                            required: true,
                            message: 'Please select!',
                          },
                        ]}
                      >
                        <Select options={transformedArray} showSearch></Select>
                      </Form.Item>

                      <Form.Item label="Duration" required>
                        <Space.Compact>
                          <Form.Item
                            name={['duration', 'number']}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: 'Number is required',
                              },
                            ]}
                          >
                            <Select placeholder="Select number">
                              {selectNumbers.map((number) => (
                                <Option key={number} value={number}>
                                  {number}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name={['duration', 'period']}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: 'Period is required',
                              },
                            ]}
                          >
                            <Select placeholder="Period">
                              <Option value="weeks">Weeks</Option>
                              <Option value="months">Months</Option>
                            </Select>
                          </Form.Item>
                        </Space.Compact>
                      </Form.Item>

                      <Form.Item
                        label={
                          <>
                            Wage
                            <Tooltip title="Can be 'negotiable' or 'from-to' or number">
                              <QuestionCircleOutlined
                                style={{ color: 'gray', marginLeft: '8px' }}
                              />
                            </Tooltip>
                          </>
                        }
                        required
                      >
                        <Space.Compact>
                          <Form.Item
                            name={['wage', 'amount']}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: 'Number is required',
                              },
                            ]}
                          >
                            <Input
                              placeholder="0"
                              addonAfter={suffixSelector}
                              style={{
                                width: '50%',
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name={['wage', 'period']}
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: 'Period is required',
                              },
                            ]}
                          >
                            <Select
                              placeholder="Period"
                              style={{
                                width: '35%',
                              }}
                            >
                              <Option value="day">per day</Option>
                              <Option value="month">per month</Option>
                              <Option value="year">per year</Option>
                            </Select>
                          </Form.Item>
                        </Space.Compact>
                      </Form.Item>
                      <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[
                          {
                            required: true,
                            message: 'Start date is required',
                          },
                        ]}
                      >
                        <DatePicker
                          disabledDate={disabledDate}
                          placeholder="DD.MM.YYYY"
                          format="DD.MM.YYYY"
                        />
                      </Form.Item>
                      <Form.Item
                        name="citizenship"
                        label="Seaman Citizenship"
                        rules={[
                          {
                            type: 'array',
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select so many as you need"
                        >
                          {countryList.map((country, index) => (
                            <Option key={index} value={country}>
                              {country}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="description" label="Job description">
                        <TextArea
                          rows={4}
                          placeholder="Add any information about the Job"
                        />
                      </Form.Item>
                      <Form.Item
                        name="vesselType"
                        label="Vessel Type"
                        rules={[
                          {
                            required: true,
                            message: 'Please select!',
                          },
                        ]}
                      >
                        <Select showSearch>
                          {shipTypes.map((ship, index) => (
                            <Option key={index} value={ship}>
                              {ship}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="vesselFlag" label="Vessel Flag">
                        <Select showSearch>
                          {flagStates.map((state, index) => (
                            <Option key={index} value={state}>
                              {state}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="vesselOwner" label="Vessel Owner">
                        <Select showSearch>
                          {countryList.map((country, index) => (
                            <Option key={index} value={country}>
                              {country}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="tradingRegion" label="Trading Region">
                        <Input />
                      </Form.Item>
                      <Form.Item name="vesselName" label="Veessel Name">
                        <Input />
                      </Form.Item>
                      <Form.Item name="vesselDWT" label="Vessel DWT">
                        <Input />
                      </Form.Item>
                      <Form.Item name="mainEngineType" label="Main Engine Type">
                        <Input />
                      </Form.Item>
                      <Form.Item name="mainEngineKw" label="Main Engine kW">
                        <Input />
                      </Form.Item>
                      <Form.Item name="yearBuilt" label="Year Built">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="crew"
                        label="Crew on board"
                        rules={[
                          {
                            type: 'array',
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select so many as you need"
                        >
                          {countryList.map((country, index) => (
                            <Option key={index} value={country}>
                              {country}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          xs: {
                            span: 24,
                            offset: 0,
                          },
                          sm: {
                            span: 16,
                            offset: 8,
                          },
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              ) : (
                <div className="posted-vacancies">
                  <Button onClick={handleAddVacancy} type="primary">
                    + Add Vacancy
                  </Button>
                  <h2>My posted vacancies</h2>
                  {vacancies.length === 0 ? (
                    <div className="no-active-vacancies">
                      <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                          height: 100,
                        }}
                        description={<span>No vacancies posted yet...</span>}
                      ></Empty>
                    </div>
                  ) : (
                    <div className="active-vacancies">
                      {vacancies.map((vacancy) => {
                        return (
                          <div
                            key={vacancy._id}
                            className="user-vacancy-wrapper"
                          >
                            <div className="user-vacancy-top">
                              <h2>{vacancy.position}</h2>
                              <div className="user-vacancy-posted">
                                {vacancy.timeStamp}
                              </div>
                            </div>

                            <div className="user-vacancy-info">
                              <div className="user-vacancy-info-keys">
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">Wage:</p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.wage.amount} {vacancy.suffix} /{' '}
                                    {vacancy.wage.period}
                                  </p>
                                </div>
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">
                                    Vessel type:
                                  </p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.vesselType}
                                  </p>
                                </div>
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">
                                    Start date:
                                  </p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.embarkation}
                                  </p>
                                </div>
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">
                                    Contract duration:
                                  </p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.duration.number}{' '}
                                    {vacancy.duration.period}
                                  </p>
                                </div>
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">
                                    Seamen applied:
                                  </p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.seamenApplied.length}
                                  </p>
                                </div>
                                <div className="user-vacancy-key-value">
                                  <p className="user-vacancy-left-key">
                                    Vacancy viewed:
                                  </p>
                                  <p className="user-vacancy-right-value">
                                    {vacancy.viewed}
                                  </p>
                                </div>
                              </div>
                              <div className="user-vacancy-company-info">
                                <div className="user-vacancy-company-logo">
                                  <Space wrap size={16}>
                                    <Avatar
                                      shape="square"
                                      size={120}
                                      icon={
                                        vacancy.userLogoUrl ? (
                                          <img
                                            src={vacancy.userLogoUrl}
                                            alt="Logo"
                                          />
                                        ) : (
                                          <UserOutlined />
                                        )
                                      }
                                    />
                                  </Space>
                                </div>
                                <div className="user-vacancy-company-country">
                                  <p>{vacancy.userCountry}</p>
                                </div>
                              </div>
                            </div>
                            <div className="user-vacancy-bottom">
                              <div className="user-vacancy-bottom-left">
                                <p className="user-vacancy-right-value">
                                  {' '}
                                  <Link
                                    to={`/seafarers-applied/${vacancy._id}`}
                                  >
                                    Watch applied seamen {'>'}
                                  </Link>
                                </p>
                              </div>

                              <div className="user-vacancy-bottom-right">
                                <Button
                                  danger
                                  onClick={() =>
                                    handleDeleteVacancy(vacancy._id)
                                  }
                                >
                                  Delete Vacancy
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* IF USER IS SEAMAN */
            <div className="posted-vacancies">
              <h2>Applied Vacancies</h2>
              {vacancies.length < 1 ? (
                <div className="no-active-vacancies">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 100,
                    }}
                    description={<span>No vacancies applied...</span>}
                  ></Empty>
                </div>
              ) : (
                <div className="active-vacancies">
                  {vacancies.map((vacancy) => {
                    return (
                      <div key={vacancy._id} className="user-vacancy-wrapper">
                        <div className="user-vacancy-top">
                          <h2>{vacancy.position}</h2>
                          <div className="user-vacancy-posted">
                            {vacancy.timeStamp}
                          </div>
                        </div>

                        <div className="user-vacancy-info">
                          <div className="user-vacancy-info-keys">
                            <div className="user-vacancy-key-value">
                              <p className="user-vacancy-left-key">Wage:</p>
                              <p className="user-vacancy-right-value">
                                {vacancy.wage.amount} {vacancy.suffix} /{' '}
                                {vacancy.wage.period}
                              </p>
                            </div>
                            <div className="user-vacancy-key-value">
                              <p className="user-vacancy-left-key">
                                Vessel type:
                              </p>
                              <p className="user-vacancy-right-value">
                                {vacancy.vesselType}
                              </p>
                            </div>
                            <div className="user-vacancy-key-value">
                              <p className="user-vacancy-left-key">
                                Start date:
                              </p>
                              <p className="user-vacancy-right-value">
                                {vacancy.embarkation}
                              </p>
                            </div>
                            <div className="user-vacancy-key-value">
                              <p className="user-vacancy-left-key">
                                Contract duration:
                              </p>
                              <p className="user-vacancy-right-value">
                                {vacancy.duration.number}{' '}
                                {vacancy.duration.period}
                              </p>
                            </div>
                          </div>
                          <div className="user-vacancy-company-info">
                            <div className="user-vacancy-company-logo">
                              <Space wrap size={16}>
                                <Avatar
                                  shape="square"
                                  size={120}
                                  icon={
                                    vacancy.userLogoUrl ? (
                                      <img
                                        src={vacancy.userLogoUrl}
                                        alt="Logo"
                                      />
                                    ) : (
                                      <UserOutlined />
                                    )
                                  }
                                />
                              </Space>
                            </div>
                            <div className="user-vacancy-company-country">
                              <p>{vacancy.userCountry}</p>
                            </div>
                          </div>
                        </div>
                        <div className="user-vacancy-bottom">
                          <div>Viewed: {vacancy.viewed}</div>
                          <div>
                            <Button
                              value={vacancy._id}
                              onClick={handleCancelApplying}
                              danger
                            >
                              Cancel Applying
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Vacancies;
