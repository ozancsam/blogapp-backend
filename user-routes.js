const express = require('express');
const router = express.Router(); 
const { getAllUser, signup, login } = require('../controllers/user-controller');



router.get('/', getAllUser);
router.post('/signup', signup);
router.post('/login', login);


module.exports = router;

// const express = require('express');
// const router = express.Router(); 
// const getAllUser = require('../controllers/user-controller').getAllUser;

// router.get('/', getAllUser); 

// module.exports = router; 
