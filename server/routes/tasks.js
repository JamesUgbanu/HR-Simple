import { check } from 'express-validator';
import validation from '../middleware/validator';
import TaskController from '../controller/TaskController';

const routes = (app) => {
  app.post('/api/v1/task', [
    check('taskName').not().isEmpty().withMessage('Task Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('assignee').not().isEmpty().withMessage('Assignee is required')
  ], validation.validatorError, TaskController.createTask);
};

export default routes;
