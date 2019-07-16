import { check } from 'express-validator';
import UsersController from '../controller/UsersController';
import validation from '../middleware/validator';

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).send({
    status: 200,
    message: 'Welcome to HR Simple Application',
  }));
  app.post('/api/v1/auth/addUser', [
    check('firstName')
      .not()
      .isEmpty().withMessage('first Name is required'),
    check('email')
      .isEmail().withMessage('Enter a valid email')
  ], validation.validatorError, validation.checkDuplicateEmail, UsersController.addUser);
};

export default routes;
