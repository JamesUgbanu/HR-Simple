import jwt from 'jsonwebtoken';
import conn from '../helpers/conn';
import transport from '../helpers/mailTransporter';
import config from '../config/config';

const { secretKey } = config;
const client = conn();
client.connect();
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
}
export default TaskController;
