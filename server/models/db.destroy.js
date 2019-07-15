const userDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const taskTable = 'DROP TABLE IF EXISTS task CASCADE; ';

const destroyQuery = `${userDestroy}${taskTable}`;

export default destroyQuery;
