const createExt = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; ';
const userDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const taskTable = 'DROP TABLE IF EXISTS tasks CASCADE; ';

const destroyQuery = `${userDestroy}${taskTable}${createExt}`;

export default destroyQuery;
