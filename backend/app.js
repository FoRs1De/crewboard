const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT;
const path = require('path');

const postUser = require('./controllers/postControllers/postUser');
const postUserLogin = require('./controllers/postControllers/postUserLogin');
const deleteUser = require('./controllers/deleteControllers/deleteUserById');
const countAllUsers = require('./controllers/getControllers/countAllUsers');
const countVacancies = require('./controllers/getControllers/countVacancies');
const getUserAuthentication = require('./controllers/getControllers/getUserAuthentication');
const postUserEmailCheck = require('./controllers/postControllers/postUserEmailCheck');
const putUserPasswordChange = require('./controllers/putControllers/putUserPasswordChange');
const putUserPasswordChangeFromSettings = require('./controllers/putControllers/putUserPasswordChangeFromSettings');
const putUserEmailChangeFromSettings = require('./controllers/putControllers/putUserEmailChangeFromSettings');
const putUserEmailVerification = require('./controllers/putControllers/putUserEmailVerification');
const postResendVerfication = require('./controllers/postControllers/postResendVerification');
const postVacancy = require('./controllers/postControllers/postVacancy');
const getEmplyerVacancies = require('./controllers/getControllers/getEmployerVacancies');
const getAllCompanies = require('./controllers/getControllers/getAllCompanies');
const getAllVacancies = require('./controllers/getControllers/getAllVacancies');
const getVacancy = require('./controllers/getControllers/getVacancy');
const postUploadLicenses = require('./controllers/postControllers/postUploadLicenses');
const postUploadLogos = require('./controllers/postControllers/postUploadLogos');
const postUploadSeamenPhotos = require('./controllers/postControllers/postUploadSeamenPhotos');
const putUpdateEmplyerData = require('./controllers/putControllers/putUpdateEmployerData');
const putUpdateSeamanData = require('./controllers/putControllers/putUpdateSeamanData');
const getCompany = require('./controllers/getControllers/getCompany');
const putApplyVacancy = require('./controllers/putControllers/putApplyVacancy');
const putRemoveApplyVacancy = require('./controllers/putControllers/putApplyRemoveVacancy');
const getSeamanVacancies = require('./controllers/getControllers/getSeamanVacancies');
const deleteVacancy = require('./controllers/deleteControllers/deleteVacancy');
const getAllSeamen = require('./controllers/getControllers/getAllSeamen');
const getSeamenApplied = require('./controllers/getControllers/getSeamenApplied');
const getCompanyVacancies = require('./controllers/getControllers/getCompanyVacacies');
//body-parser, coockie-parser
app.use(bodyParser.json());
app.use(cookieParser());

//Cors config
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

//USERS authentication, login/Registration, verification
app.use('/login-user', postUserLogin);
app.use('/post-user', postUser);
app.use('/user-authentication', getUserAuthentication);
app.use('/password-reset', postUserEmailCheck);
app.use('/password-reset', putUserPasswordChange);
app.use('/email-verification', putUserEmailVerification);
app.use('/resend-verification', postResendVerfication);
//----------------------------------------

//USERS requests-------------------------
app.use('/delete-user', deleteUser);
app.use('/password-change', putUserPasswordChangeFromSettings);
app.use('/email-change', putUserEmailChangeFromSettings);
app.use('/update-employer', putUpdateEmplyerData);
app.use('/update-seaman', putUpdateSeamanData);
app.use('/all-seamen', getAllSeamen);
app.use('/seamen-applied', getSeamenApplied);
//----------------------------------------

//USERS requests -------------------------
app.use('/count-users', countAllUsers);
app.use('/count-vacancies', countVacancies);
//-------------------------------------------

//Vacancies requests -------------------------
app.use('/all-vacancies', getAllVacancies);
app.use('/vacancy', getVacancy);
app.use('/add-vacancy', postVacancy);
app.use('/user-vacancies', getEmplyerVacancies);
app.use('/vacancy-apply', putApplyVacancy);
app.use('/remove-apply-vacancy', putRemoveApplyVacancy);
app.use('/seaman-vacancies', getSeamanVacancies);
app.use('/delete-vacancy', deleteVacancy);
app.use('/company-vacancies', getCompanyVacancies);
//-------------------------------------------

//Companies requests-------------------------
app.use('/all-companies', getAllCompanies);
app.use('/company', getCompany);
//------------------------------------------

//Files uploads------------------------------

app.use('/upload/companies/licenses', postUploadLicenses);
app.use('/upload/companies/logos', postUploadLogos);
app.use('/upload/seamen/photos', postUploadSeamenPhotos);
//-------------------------------------------

//Uploaded files path------------------------
app.use(express.static(path.join(__dirname, 'uploads')));
//--------------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
