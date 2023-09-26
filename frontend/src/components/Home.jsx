import './styles/home.css';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import ranks from '../assets/ranks';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Home = ({ countVacancies, allVacancies, setVacancies }) => {
  const handleVacancyClick = (e) => {
    const value = e.currentTarget.getAttribute('value');
    if (value === 'shipowner') {
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return value.includes(vacancy.userRole);
      });
      setVacancies(filteredVacancies);
    } else if (value === 'other') {
      console.log(ranks);
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return ranks[2].OTHER.includes(vacancy.position);
      });
      setVacancies(filteredVacancies);
    } else {
      console.log(value.split(','));
      const filteredVacancies = allVacancies.filter((vacancy) => {
        return value.includes(vacancy.position);
      });
      setVacancies(filteredVacancies);
    }
  };

  const recentVacancies = allVacancies.slice(0, 5);
  const popularVacancies = allVacancies.slice();
  popularVacancies.sort((a, b) => b.viewed - a.viewed);

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <strong>
            <p>FIND YOUR PERFECT JOB</p>
          </strong>
          <h1>CREWBOARD</h1>
          <strong>
            <p>FOR SEAMEN AND EMPLOYERS</p>
          </strong>
        </div>
      </div>
      <div className="home-page-body">
        <div className="vacancies-for-seamen">
          <center>
            <h1>Vacancies for Seamen</h1>
          </center>
          <center>
            <p>Fastest way of applying by representing your cv to Employers</p>
          </center>
          <div className="ranks">
            <div className="ranks-left-list">
              <Link
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
                value={['Chief Cook', 'Cook', '2nd Cook', 'Messboy', 'AB/Cook']}
                onClick={handleVacancyClick}
                className="ranks-item"
              >
                <p className="count-vacancies">
                  <CountUp end={countVacancies.galley} />
                </p>
                <p>Galley</p>
              </Link>
              <Link
                to="/vacancies"
                value="shipowners"
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
                to="/vacancies"
                value={['Chief Engineer', 'Single Engineer', 'Superintendent']}
                onClick={handleVacancyClick}
                className="ranks-item"
              >
                <p className="count-vacancies">
                  <CountUp end={countVacancies.chiefEngineers} />
                </p>
                <p>Chief Engineers</p>
              </Link>
              <Link
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
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
                to="/vacancies"
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
        <div className="home-vacancies">
          <div className="home-recent-popular-vacancies">
            <div className="home-recent-vacancies">
              <center>
                <h1>Recent Vacancies</h1>
              </center>
              {recentVacancies.map((vacancy) => {
                return (
                  <div key={vacancy._id} className="home-vacancy-wrapper">
                    <div className="vacancy-top">
                      <h2>{vacancy.position}</h2>
                      <div className="vacancy-posted">{vacancy.timeStamp}</div>
                    </div>

                    <div className="home-vacancy-info">
                      <div className="info-keys">
                        <div className="home-key-value">
                          <p className="left-key">Wage:</p>
                          <p className="right-value">
                            {vacancy.wage.amount} {vacancy.suffix} /{' '}
                            {vacancy.wage.period}
                          </p>
                        </div>
                        <div className="home-key-value">
                          <p className="left-key">Vessel type:</p>
                          <p className="right-value">{vacancy.vesselType}</p>
                        </div>
                        <div className="home-key-value">
                          <p className="left-key">Start date:</p>
                          <p className="right-value">{vacancy.embarkation}</p>
                        </div>
                        <div className="home-key-value">
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
                        <Link to={`/vacancies/${vacancy._id}`}>
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
            </div>
            <div className="home-popular-vacancies">
              <center>
                <h1>Popular Vacancies</h1>
              </center>
              {popularVacancies.map((vacancy) => {
                return (
                  <div key={vacancy._id} className="home-vacancy-wrapper">
                    <div className="vacancy-top">
                      <h2>{vacancy.position}</h2>
                      <div className="vacancy-posted">{vacancy.timeStamp}</div>
                    </div>

                    <div className="home-vacancy-info">
                      <div className="info-keys">
                        <div className="home-key-value">
                          <p className="left-key">Wage:</p>
                          <p className="right-value">
                            {vacancy.wage.amount} {vacancy.suffix} /{' '}
                            {vacancy.wage.period}
                          </p>
                        </div>
                        <div className="home-key-value">
                          <p className="left-key">Vessel type:</p>
                          <p className="right-value">{vacancy.vesselType}</p>
                        </div>
                        <div className="home-key-value">
                          <p className="left-key">Start date:</p>
                          <p className="right-value">{vacancy.embarkation}</p>
                        </div>
                        <div className="home-key-value">
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
                        <Link to={`/vacancies/${vacancy._id}`}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
