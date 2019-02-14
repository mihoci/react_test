const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'pmihoci', '', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 1,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
    username: {type: Sequelize.STRING, unique: true},
    password: Sequelize.STRING
})

User.sync({force: true}).then(() => {
    console.log('table users created')
    return User.create({
        username: 'admin',
        password: 'admin'
    })
})

