const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { setLocale } = require('./utils/multilingual');




dotenv.config();
const SecreteKey= process.env.JWT_SECRET
//connectDB();

const app = express();

app.use(express.json());
app.use(setLocale);

app.use('/api/books', bookRoutes);
app.use('/api/users/id', userRoutes);
app.use('/api/libraries', libraryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8880;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
