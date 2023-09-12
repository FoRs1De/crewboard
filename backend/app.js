const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT;

const getAllUsers = require('./controllers/getControllers/getAllUsers');
const getUserById = require('./controllers/getControllers/getUserById');
const postUser = require('./controllers/postControllers/postUser');
const postUserLogin = require('./controllers/postControllers/postUserLogin');
const deleteUser = require('./controllers/deleteControllers/deleteUserById');
const countAllUsers = require('./controllers/getControllers/countAllUsers');
const getUserAuthentication = require('./controllers/getControllers/getUserAuthentication');
const postUserEmailCheck = require('./controllers/postControllers/postUserEmailCheck');
const putUserPasswordChange = require('./controllers/putControllers/putUserPasswordChange');

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

//USERS authentication
app.use('/login-user', postUserLogin);
app.use('/post-user', postUser);
app.use('/user-authentication', getUserAuthentication);
app.use('/password-reset', postUserEmailCheck);
app.use('/password-reset', putUserPasswordChange);

//USERS requests ----------------------------
app.use('/get-all-users', getAllUsers);
app.use('/get-user-by-id', getUserById);
app.use('/delete-user', deleteUser);
app.use('/count-users', countAllUsers);
//-------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
