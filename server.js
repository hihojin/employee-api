const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const employeeRouter = require('./routers/employeeRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/employee', employeeRouter);

let mongoEndpoint = 'mongodb://0.0.0.0/0/project_app';
if (process.env.MONGODB_URI) {
    mongoEndpoint = process.env.MONGODB_URI;
}
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(8000, function () {
  console.log('Starting server now...');
});
