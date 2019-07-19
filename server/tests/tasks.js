import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const loginURL = '/api/v1/auth/signIn';
let currrentToken;
let taskId;

describe('TASK CONTROLLER ', () => {
  describe('POST /api/v1/task', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'jamesugbanu@gmail.com',
          password: 'scrip#9ju',
        })
        .end((error, response) => {
          currrentToken = response.body.data.token;
          done();
        });
    });
    it('it should add return no task found', (done) => {
      chai.request(app)
        .get('/api/v1/tasks')
        .set('token', currrentToken)
        .end((error, response) => {

          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('No task found');
          done();
        });
    });
    it('it should add return no task found when user want to update', (done) => {
      chai.request(app)
        .put('/api/v1/task/15669920-5258-45fc-8eb3-05b3353c8af9/status')
        .send({
          status: 'ongoing',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('No task found');
          done();
        });
    });
    it('it should add a new task with correct and complete information', (done) => {
      chai.request(app)
        .post('/api/v1/task')
        .send({
          taskName: 'Update website',
          dueDate: '2019-07-20 13:12:29',
          description: 'Remove content from header and place it below',
          assignee: 2,
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.success).to.equal('Task created successfully');
          done();
        });
    });
    it('it should not add a new task when task name is empty', (done) => {
      chai.request(app)
        .post('/api/v1/task')
        .send({
          taskName: '',
          dueDate: '2019-07-20 13:12:29',
          description: 'Remove content from header and place it below',
          assignee: 2,
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Task Name is required');
          done();
        });
    });
    it('it should not add a new task when task desciption is empty', (done) => {
      chai.request(app)
        .post('/api/v1/task')
        .send({
          taskName: 'Update website',
          dueDate: '2019-07-20 13:12:29',
          description: '',
          assignee: 2,
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Description is required');
          done();
        });
    });
    it('it should not add a new task when assignee is empty', (done) => {
      chai.request(app)
        .post('/api/v1/task')
        .send({
          taskName: 'Update website',
          dueDate: '2019-07-20 13:12:29',
          description: 'Remove content from header and place it below',
          assignee: '',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Assignee is required');
          done();
        });
    });
    it('it should not add a new task when a invalid or empty token is set', (done) => {
      chai.request(app)
        .post('/api/v1/task')
        .send({
          taskName: 'Update website',
          dueDate: '2019-07-20 13:12:29',
          description: 'Remove content from header and place it below',
          assignee: 2,
        })
        .set('token', '')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('not authenticated');
          done();
        });
    });
  });
  describe('GET /api/v1/tasks endpoint', () => {
    it('it should return all tasks', (done) => {
      chai.request(app)
        .get('/api/v1/tasks')
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          taskId = response.body.data[0].id;
          done();
        });
    });
  });
  describe('PUT /task/:id/status endpoint', () => {
    it('it should update the status of a task when correct status is supplied', (done) => {
      chai.request(app)
        .put(`/api/v1/task/${taskId}/status`)
        .send({
          status: 'ongoing',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          expect(response.body.data.status).to.equal('ongoing');
          done();
        });
    });
    it('it should not update the status of a task when wrong status is supplied', (done) => {
      chai.request(app)
        .put(`/api/v1/task/${taskId}/status`)
        .send({
          status: 'on-going',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Status should be either ongoing or completed');
          done();
        });
    });
    it('it should not update the status of a task when wrong task id is supplied', (done) => {
      chai.request(app)
        .put(`/api/v1/task/'dhjhjsjkhjdf88999'/status`)
        .send({
          status: 'ongoing',
        })
        .set('token', currrentToken)
        .end((error, response) => {
          expect(response).to.have.status(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Server error');
          done();
        });
    });
  });
});
