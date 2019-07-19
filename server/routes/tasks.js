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
  app.put('/api/v1/task/:id/status', userAuthenticate.authenticateUser, [
    check('status')
      .matches(/(ongoing|completed)$/).withMessage('Status should be either ongoing or completed')
  ], validation.validatorError, TaskController.updateTaskStatus);
  app.get('/api/v1/tasks', userAuthenticate.authenticateUser, TaskController.getAllTasks);
  app.put('/api/v1/task/:id/completed', userAuthenticate.authenticateUser, [
    check('note').not().isEmpty().withMessage('Note is required')
  ], validation.validatorError, TaskController.updateTaskCompleted);
  app.get('/api/v1/task/:id', userAuthenticate.authenticateUser, TaskController.getTaskById);
};

export default routes;
