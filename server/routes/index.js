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
      .isEmpty().withMessage('first Name is required')
      .isLength({ min: 3 }).withMessage('first name should be atleast 3 characters')
      .isAlpha().withMessage('first name should only contain alphabet'),
    check('lastName')
      .not()
      .isEmpty().withMessage('last Name is required')
      .isLength({ min: 3 }).withMessage('last name should be atleast 3 characters')
      .isAlpha().withMessage('last name should only contain alphabet'),
    check('email')
      .isEmail().withMessage('Enter a valid email')
  ], validation.validatorError, validation.checkDuplicateEmail, UsersController.addUser);
  app.get('/api/v1/register/confirm/:token', UsersController.confirmUser);
  app.put('/api/v1/user/:email/password', UsersController.updateUserPassword);
};

export default routes;
