import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import sahabatRoute from './routes/index.js';

const PORT = 5001;
const app = express();

async () => {
  try {
    await db.authenticate();
    console.log('DB Connected');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
};

// app.use(cors());
var whitelist = [
  'http://localhost:3000',
  'http://192.168.10.170:3000',
  'http://192.168.10.67:3000',
  'http://117.74.123.236:3000',
];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/', sahabatRoute);
app.listen(PORT, () => console.log(`Server Runing On port : ${PORT}`));
