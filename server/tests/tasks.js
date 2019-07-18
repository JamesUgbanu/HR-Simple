import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const loginURL = '/api/v1/auth/signIn';
let currrentToken;

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
  });
});
