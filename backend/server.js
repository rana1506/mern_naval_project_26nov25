require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const officerRoutes = require('./routes/officers');
const sailorRoutes = require('./routes/sailors');
const divisionRoutes = require('./routes/divisions');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/officers', officerRoutes);
app.use('/api/sailors', sailorRoutes);
app.use('/api/divisions', divisionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
  console.log('Mongo connected');
  app.listen(PORT, ()=> console.log('Server running on', PORT));
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
