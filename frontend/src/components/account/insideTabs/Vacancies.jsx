import { useState } from 'react';
import '../../styles/vacancies.css';
import ranksSelect from '../../../assets/ranksSelect';
import countryList from '../../../assets/countries';
import shipTypes from '../../../assets/shipTypes';
import flagStates from '../../../assets/flagStates';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const Vacancies = () => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [showAddVacancyForm, setShowAddVacancieForm] = useState(false);

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

  return (
    <>
      {showAddVacancyForm ? (
        <div className="add-vacancy">
          <div className="go-back">
            <Button onClick={handleGoBack} type="link">
              {'<'} Go Back
            </Button>
          </div>
          <div className="add-vacancy-form">
            {' '}
            <Form
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
              initialValues={{ suffix: '$', citizenship: ['Any Citizenship'] }}
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
                      <Option value="aDay">per day</Option>
                      <Option value="aMonth">per month</Option>
                      <Option value="aYear">per year</Option>
                    </Select>
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <Form.Item name="startDate" label="Start Date" required>
                <DatePicker placeholder="DD.MM.YYYY" format="DD.MM.YYYY" />
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
            </Form>
          </div>
        </div>
      ) : (
        <Button onClick={handleAddVacancy} type="primary">
          + Add Vacancy
        </Button>
      )}
    </>
  );
};

export default Vacancies;
