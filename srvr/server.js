const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userModel = require('./models/user')
const sequelize = new Sequelize('test', 'pmihoci', '', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool:{
        max: 1,
        min: 1,
        acquire: 30000,
        idile: 10000
    }
})

sequelize.authenticate().then(console.log('authentication success')).catch(err => console.error(err));
const User = sequelize.define('user', userModel);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  User.findOne({ where: {username: req.body.username}})
  .then(user => {
    if(req.body.password === user.password){
      res.json(user)
    }else{
      res.status(400).json('error logging in');
    }
  })
  .catch(() => res.status(400).json('error logging in'))
})

app.post('/addUser', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(() => res.json('success'))
  .catch(err => {
    res.status(400).json('Error adding user')
  })

})

app.get('/users', (req, res) =>{
  User.findAll().then(users => {
    res.json(users);
  }).catch(() => res.status(400).json('error getting users'))
})

app.get('/', (req, res)=>{
    res.send('server running');
})

app.listen(3001, ()=>{
    console.log('running');
})