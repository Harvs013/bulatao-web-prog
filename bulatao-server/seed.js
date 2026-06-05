// bulatao-server/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'admin@bulatao.com' });
  if (existing) {
    console.log('Admin already exists, skipping.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin1234', 10);
  await User.create({
    firstName: 'Admin',
    lastName:  'User',
    age:       '30',
    gender:    'other',
    contactNumber: '09000000000',
    email:     'admin@bulatao.com',
    type:      'admin',
    username:  'admin',
    password:  hashedPassword,
    address:   'Bulatao HQ',
    isActive:  true,
  });

  console.log('Done! Login with admin@bulatao.com / admin1234');
  process.exit(0);
};

seed();