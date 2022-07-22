import { Sequelize } from 'sequelize';

// const DB_HRD = new Sequelize('sui_hr_sistem', 'egipublic', 'Asd159789.', {
//   host: '117.74.123.236',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });
const DB_HRD = new Sequelize('sui_hr_sistem', 'egipublic', 'Asd159789.', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00',
  dialectOptions: {
    timezone: 'local',
  },
});
// const DB_HRD = new Sequelize('sui_hr_sistem', 'egipublic', 'Asd159789.', {
//   host: '192.168.10.105',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });

export default DB_HRD;
