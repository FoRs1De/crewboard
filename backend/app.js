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
const deleteUser = require('./controllers/deleteControllers/deleteUserById');
const editUser = require('./controllers/putControllers/editUser');
const countAllUsers = require('./controllers/getControllers/countAllUsers');

//body-parser, coockie-parser and cors
app.use(bodyParser.json());
app.use(cookieParser());

//Cors config
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

//USERS requests ----------------------------
app.use('/get-all-users', getAllUsers);
app.use('/get-user-by-id', getUserById);
app.use('/post-user', postUser);
app.use('/edit-user', editUser);
app.use('/delete-user', deleteUser);

app.use('/count-users', countAllUsers);
//-------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
