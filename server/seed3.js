const mongoose = require('mongoose');
require('dotenv').config();
const Company = require('./models/Company');

const companies = [
  { name: 'Google', type: 'Product', status: 'Hiring' },
  { name: 'Microsoft', type: 'Product', status: 'Hiring' },
  { name: 'Apple', type: 'Product', status: 'Upcoming' },
  { name: 'Amazon', type: 'Product', status: 'Hiring' },
  { name: 'Adobe', type: 'Product', status: 'Hiring' },
  { name: 'TCS', type: 'Service', status: 'Hiring' },
  { name: 'Infosys', type: 'Service', status: 'Hiring' },
  { name: 'Wipro', type: 'Service', status: 'Closed' },
  { name: 'Accenture', type: 'Service', status: 'Hiring' },
  { name: 'IBM', type: 'Product', status: 'Upcoming' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    // Clear existing to avoid duplicates if user already added some
    await Company.deleteMany({});
    
    await Company.insertMany(companies);
    console.log('Successfully seeded 10 companies!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding data', err);
    process.exit(1);
  });
