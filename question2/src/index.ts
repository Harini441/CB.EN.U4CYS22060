
import express from 'express';
import { numbersRouter } from './routes/numbers';

const app = express();
const PORT = process.env.PORT || 3000;

// Register routes
app.use('/numbers', numbersRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Average Calculator Microservice',
    author: 'Shree Harini T',
    email: 'cb.en.u4cys22060@cb.students.amrita.edu',
    college: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    github: 'Harini441'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
