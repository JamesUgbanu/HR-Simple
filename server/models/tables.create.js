const createUserTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100),
    address TEXT,
    join_date TIMESTAMP WITH TIME ZONE,
    birth_date TIMESTAMP WITH TIME ZONE,
    last_loggedin TIMESTAMP WITH TIME ZONE,
    role INTEGER,
    is_admin BOOLEAN DEFAULT false,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (email)
  );
`;

const createTaskTable = `
  CREATE TABLE IF NOT EXISTS tasks(
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id INTEGER REFERENCES users(id) NOT NULL,
    task_name VARCHAR(50) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    description TEXT,
    note TEXT,
    assignee INTEGER REFERENCES users(id) NOT NULL,
    task_type VARCHAR(40),
    completed_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(10) DEFAULT 'open',
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createQuery = `${createUserTable}${createTaskTable}`;
export default createQuery;
