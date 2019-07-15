const routes = (app) => {
  app.get('/', (request, response) => response.status(200).send({
    status: 200,
    message: 'Welcome to HR Simple Application',
  }));
};

export default routes;
