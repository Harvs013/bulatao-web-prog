const express = require('express');
// import functions
const { getUsers, createUser, updateUser, deleteUser, loginUser, } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.post('/login', loginUser);


router.route('/:id').put(updateUser).delete(deleteUser);


module.exports = router;