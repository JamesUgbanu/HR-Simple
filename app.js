import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './server/routes/users';
import taskRoutes from './server/routes/tasks';

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT || 5000;

// declare middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// declare accepted cors URL
// Set up a whitelist and check against it:
// const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
// const corsOptions = {
//   origin (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// Then pass them to cors:


userRoutes(app);
taskRoutes(app);

// declare 404 route
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The URL you are trying to access does not exist. Please enter a valid url',
}));

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
