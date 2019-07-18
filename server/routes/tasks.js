import { check } from 'express-validator';
import validation from '../middleware/validator';
import TaskController from '../controller/TaskController';
import userAuthenticate from '../middleware/userAuthenticate';

const routes = (app) => {
  app.post('/api/v1/task', userAuthenticate.authenticateUser, [
    check('taskName').not().isEmpty().withMessage('Task Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('assignee').not().isEmpty().withMessage('Assignee is required')
  ], validation.validatorError, TaskController.createTask);
};

export default routes;
