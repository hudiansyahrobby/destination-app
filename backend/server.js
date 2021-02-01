const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');

const authRoute = require('./routes/auth')

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(compression());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/api/v1', authRoute);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));