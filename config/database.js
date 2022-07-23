import { Sequelize } from 'sequelize';

const db = new Sequelize('db_sahabat_unggul', 'egipublic', 'Asd159789.', {
  host: '192.168.10.105',
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00',
  dialectOptions: {
    timezone: 'local',
  },
});
// const db = new Sequelize('db_sahabat_unggul', 'egipublic', 'Asd159789.', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });

// const db = new Sequelize('db_sahabat_unggul', 'egipublic', 'Asd159789.', {
//   host: '117.74.123.236',
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+07:00',
//   dialectOptions: {
//     timezone: 'local',
//   },
// });

export default db;
