const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User
} = require('../models');

router.get('/', (req, res) => {
    res.send("Home Route");
    console.log(req.body);
});


module.exports = router;