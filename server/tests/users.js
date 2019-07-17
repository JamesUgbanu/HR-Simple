import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
chai.use(chaiHttp);
const addUserURL = '/api/v1/auth/addUser';
let currrentToken;

describe('USER CONTROLLER ', () => {
  describe('POST /api/v1/auth/addUser', () => {
    before((done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'James',
          lastName: 'Joseph',
          email: 'singlecliq@gmail.com'
        })
        .end((error, response) => {
          currrentToken = response.body.data.token;
          done();
        });
    });
    it('Endpoint does not exist', (done) => {
      chai.request(app)
        .post(`${addUserURL}/test`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('The URL you are trying to access does not exist. Please enter a valid url');
          done();
        });
    });

    it('it should register a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.email).to.equal(testData.newUsers[0].email);
          done();
        });
    });

    it('it should not register a user with an empty first name field', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: '',
          lastName: 'Doe',
          email: 'johndoe@gmail.com'
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('first Name is required');
          done();
        });
    });

    it('it should not register a user with firstname less than 3 characters', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'J',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('first name should be atleast 3 characters');
          done();
        });
    });

    it('it should not register a user with an invalid first name', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'J1#D',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('first name should only contain alphabet');
          done();
        });
    });

    it('it should not register a user with an empty last name field', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'John',
          lastName: '',
          email: 'johndoe@gmail.com',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('last Name is required');
          done();
        });
    });

    it('it should not register a user with last less than 3 characters', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'John',
          lastName: 'D',
          email: 'johndoe@gm.com',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('last name should be atleast 3 characters');
          done();
        });
    });

    it('it should not register a user with an invalid last name', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'Emmanuel',
          lastName: 'D1#E',
          email: 'johndoe@gmail.com',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('last name should only contain alphabet');
          done();
        });
    });

    it('should not register a user with an existing email address', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('E-mail already in use');
          done();
        });
    });

    it('should not register a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail',
          password: 'test24',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Enter a valid email');
          done();
        });
    });
  });
  describe('GET /register/confirm/:token endpoint', () => {
    it('it should return the specific user email', (done) => {
      chai.request(app)
        .get(`/register/confirm/${currrentToken}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.email).to.equal('singlecliq@gmail.com');
          done();
        });
    });
    it('it should return an error if an invalid token is provided', (done) => {
      chai.request(app)
        .get(`/register/confirm/ghjhjhjjhjh878mh5g`)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Inalid token');
          done();
        });
    });
  });
});
