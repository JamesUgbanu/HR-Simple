import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
chai.use(chaiHttp);
const addUserURL = '/api/v1/auth/addUser';
const loginURL = '/api/v1/auth/signIn';
let adminToken; let userToken;

describe('USER CONTROLLER ', () => {
  describe('POST /api/v1/auth/addUser', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'jamesugbanu@gmail.com',
          password: 'scrip#9ju',
        })
        .end((error, response) => {
          adminToken = response.body.data.token;
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
        .set('token', adminToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.email).to.equal(testData.newUsers[0].email);
          userToken = response.body.data.token;
          done();
        });
    });
    it('it should not register a user with incorrect or empty token', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send(testData.newUsers[0])
        .set('token', '')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('not authenticated');
          done();
        });
    });
    it('it should not register a user without an admin token', (done) => {
      chai.request(app)
        .post(`${addUserURL}`)
        .send(testData.newUsers[0])
        .set('token', userToken)
        .end((error, response) => {
          expect(response).to.have.status(403);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('unAuthorised user');
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .set('token', adminToken)
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
        .get(`/api/v1/register/confirm/${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.email).to.equal('singlecliq@gmail.com');
          done();
        });
    });
    it('it should return an error if an invalid token is provided', (done) => {
      chai.request(app)
        .get(`/api/v1/register/confirm/ghjhjhjjhjh878mh5g`)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Invalid token');
          done();
        });
    });
  });
  describe('PUT /user/:email/password endpoint', () => {
    it('it should update the password of a user', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliq@gmail.com/password`)
        .send({
          password: 'ghhhh$i0sdf',
        })
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('data');
          done();
        });
    });

    it('it should not update the password of a user with invalid email', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliqgmail.com/password`)
        .send({
          password: 'dormant12d',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Invalid Email Address');
          done();
        });
    });
    it('it should not update the password of a user when email is not found', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliq1@gmail.com/password`)
        .send({
          password: 'dormant12d',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('User not found');
          done();
        });
    });
    it('it should not update the password of a user when password is not less than 5 character', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliq@gmail.com/password`)
        .send({
          password: 'dorm',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('The password must be 5+ chars long');
          done();
        });
    });
    it('it should not update the password of a user when password contain common word', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliq@gmail.com/password`)
        .send({
          password: 'password',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Do not use a common word as the password');
          done();
        });
    });
    it('it should not update the password of a user when password does not contain number', (done) => {
      chai.request(app)
        .put(`/api/v1/user/singlecliq@gmail.com/password`)
        .send({
          password: 'dormant',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('The password must contain a number');
          done();
        });
    });
  });
  describe('POST /api/v1/auth/signin', () => {
    it('it should signin a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'singlecliq@gmail.com',
          password: 'ghhhh$i0sdf',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.firstName).to.equal(testData.newUsers[0].firstName);
          done();
        });
    });
    it('should not signin a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: '@gmail',
          password: 'ghhhh$i0sdf',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Enter a valid email');
          done();
        });
    });

    it('should not signin a user with an empty password field', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'singlecliq@gmail.com',
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0].msg).to.equal('Password is required');
          done();
        });
    });

    it('should not signin a user where email and password is incorrect', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'singlecliq@gmail.com',
          password: 'whatareyousaying',
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Email or password is incorrect');
          done();
        });
    });

    it('should not signin a user where email does not exist in the database', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'joseph@gmail.com',
          password: 'ghhhh$i0sdf',
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Email or password is incorrect');
          done();
        });
    });
  });
  describe('GET /api/v1/auth endpoint', () => {
    it('it should return current loggedIn user', (done) => {
      chai.request(app)
        .get('/api/v1/auth')
        .set('token', adminToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});
