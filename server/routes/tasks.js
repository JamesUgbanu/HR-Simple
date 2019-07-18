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
  app.put('/api/v1/task/:id/status', TaskController.updateTaskStatus);
  app.get('/api/v1/tasks', userAuthenticate.authenticateAdmin, TaskController.getAllTasks);
};

export default routes;
