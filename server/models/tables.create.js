const createUserTable = `
  CREATE TABLE IF NOT EXISTS user(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(40),
    address VARCHAR(50),
    join_date TIMESTAMP WITH TIME ZONE,
    birth_date TIMESTAMP WITH TIME ZONE,
    last_Loggedin TIMESTAMP WITH ZONE,
    role INTEGER,
    is_admin BOOLEAN DEFAULT false,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createTaskTable = `
  CREATE TABLE IF NOT EXISTS task(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES user(id) NOT NULL,
    task_name VARCHAR(50) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    description VARCHAR(10),
    assignee INTEGER REFERENCES user(id) NOT NULL,
    task_type VARCHAR(40),
    completed_date TIMESTAMP WITH TIME ZONE,
    completed_by INTEGER REFERENCES user(id) NOT NULL,
    status VARCHAR(10) DEFAULT 'open',
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createQuery = `${createUserTable}${createTaskTable}`;
export default createQuery;
