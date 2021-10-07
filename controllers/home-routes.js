const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req, res) => {
    console.log(req.body);
    res.send("hello");
}); 


module.exports = router; 