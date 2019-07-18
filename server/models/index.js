import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';
import password from '../helpers/password';

const client = connection();
client.connect();

const adminPassword = password.hashPassword('scrip#9ju');

const adminQuery = `INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES 
('james', 'Ugbanu', 'jamesugbanu@gmail.com', '${adminPassword}', true) RETURNING *;`;
const userQuery = `INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES 
('james', 'Ugbanu', 'jamesugbanu2@gmail.com', '${adminPassword}', false) RETURNING *;`;
const task = `INSERT INTO tasks(user_id, task_name, due_date, description, assignee) VALUES 
(1, 'Update website', '2019-07-20 13:12:29', 'Remove content from header and place it below', 2) RETURNING *`;

const dbQueries = `${destroyQuery}${createQuery}${adminQuery}${userQuery}${task}`;

client.query(dbQueries, (err, res) => {
  client.end();
});
