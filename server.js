import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import users from './routes/api/users.routes.js';
import auth from './routes/api/auth.routes.js';
import lists from './routes/api/lists.routes.js';
import path from 'path';

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/lists', lists);

// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
