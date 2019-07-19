import jwt from 'jsonwebtoken';
import conn from '../helpers/conn';
import transport from '../helpers/mailTransporter';
import config from '../config/config';

const { secretKey } = config;
const client = conn();
client.connect();
const taskNotFound = 'No task found';
class TaskController {
  /**
       *  Create a new Task
       *  @param {Object} request
       *  @param {Object} response
       *  @return {Object} json
       */
  static createTask(request, response) {
    const {
      taskName,
      dueDate,
      description,
      assignee,
    } = request.body;
    const verifiedToken = jwt.verify(request.headers.token, secretKey);
    const { id } = verifiedToken.user;

    const query = {
      text: 'INSERT INTO tasks(user_id, task_name, due_date, description, assignee) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [id, taskName, dueDate, description, assignee],
    };
    TaskController.addTaskQuery(response, query);
  }

  /**
       *  Run user addUser query
       *  @param {Object} request
       *  @param {Object} response
       * @param {String} query
       *  @return {Object} json
       *
       */
  static addTaskQuery(response, query) {
    client.query(query)
      .then((dbResult) => {
        const queryEmail = `SELECT email FROM users WHERE id = ${dbResult.rows[0].assignee}`;
        client.query(queryEmail)
          .then((result) => {
            const msg = {
              from: 'hr@lonadek.com',
              to: result.rows[0].email,
              subject: 'A task has been assigned to you',
              html: `<p>Please click the link to view.<br>
                    <a href="hr-simple.herokuapp.com/task/${dbResult.rows[0].id}">Task</a></p>`
            };
            transport.sendMail(msg);
          });

        return response.status(201).json({
          status: 201,
          success: 'Task created successfully'
        });
      })
      .catch();
  }

  /**
   *  User change Task Status
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

  static updateTaskStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const query = `UPDATE tasks set status = '${status}' WHERE
    id='${id}' RETURNING *`;

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: taskNotFound,
          });
        }
        return TaskController.updateTaskSuccess(response, dbResult);
      })
      .catch(e => response.status(500).json({ status: 500, error: 'Server error' }));
  }

  /**
   *  Return update task status response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
  */
  static updateTaskSuccess(response, dbResult) {
    return response.status(202).json({
      status: 202,
      data: {
        id: dbResult.rows[0].id,
        status: dbResult.rows[0].status,
      },
    });
  }

  /**
   *  Return all tasks response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static getAllTasks(request, response) {
    const query = 'SELECT * FROM tasks';

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: taskNotFound,
          });
        }
        TaskController.getTaskSuccess(response, dbResult);
      })
      .catch();
  }

  /**
   *  Return task response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static getTaskSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      data: dbResult.rows,
    });
  }
}
export default TaskController;
