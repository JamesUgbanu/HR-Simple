import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../helpers/conn';
import generateToken from '../helpers/token';
import passwordHelper from '../helpers/password';
import transport from '../helpers/mailTransporter';
import config from '../config/config';
import ValidationHelper from '../helpers/validationHelper';

dotenv.config();
const { secretKey } = config;
const client = conn();
client.connect();
class UsersController {
  /**
       *  Signup a user
       *  @param {Object} request
       *  @param {Object} response
       *  @return {Object} json
       */
  static addUser(request, response) {
    const {
      email,
      firstName,
      lastName,
    } = request.body;

    const query = {
      text: 'INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      values: [firstName, lastName, email],
    };
    UsersController.addUserQuery(request, response, query);
  }

  /**
       *  Run user addUser query
       *  @param {Object} request
       *  @param {Object} response
       * @param {String} query
       *  @return {Object} json
       *
       */
  static addUserQuery(request, response, query) {
    client.query(query)
      .then((dbResult) => {
        const currentToken = generateToken({ id: dbResult.rows[0].id, email: dbResult.rows[0].email, isadmin: dbResult.rows[0].is_admin });
        const msg = {
          from: 'hr@lonadek.com',
          to: dbResult.rows[0].email,
          subject: 'Please confirm your email address',
          html: `<p>Please click the link to confirm your email address and activate your account.<br>
          <a href="hr-simple.herokuapp.com/register/confirm/${currentToken}">Confirm Email Address</a></p>`
        };
        transport.sendMail(msg);
        return response.status(201).json({
          status: 201,
          data: {
            token: currentToken,
            id: dbResult.rows[0].id,
            firstName: dbResult.rows[0].first_name,
            lastName: dbResult.rows[0].last_name,
            email: dbResult.rows[0].email
          },
        });
      })
      .catch();
  }

  /**
   *  Return user account response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static confirmUser(request, response) {
    try {
      const { token } = request.params;
      const verifiedToken = jwt.verify(token, secretKey);
      return response.status(200).json({
        status: 200,
        data: {
          email: verifiedToken.user.email
        },
      });
    } catch (error) {
      return response.status(401).json({
        status: 401,
        error: 'Invalid token',
      });
    }
  }

  /**
   *  User change Change Password
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static updateUserPassword(request, response) {
    const { email } = request.params;
    const { password } = request.body;
    const hashedPassword = passwordHelper.hashPassword(password);
    const validEmail = ValidationHelper.checkValidEmail(email);
    if (!validEmail) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid Email Address'
      });
    }
    const query = `UPDATE users set password='${hashedPassword}' WHERE
     email='${email}' RETURNING *`;

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: 'User not found',
          });
        }
        const currentToken = generateToken({ id: dbResult.rows[0].id, isadmin: dbResult.rows[0].is_admin });
        process.env.CURRENT_TOKEN = currentToken;
        return UsersController.updateUserPasswordSuccess(response, dbResult, currentToken);
      })
      .catch();
  }

  /**
   *  Return update user password response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
  */
  static updateUserPasswordSuccess(response, dbResult, currentToken) {
    return response.status(202).json({
      status: 202,
      data: {
        id: dbResult.rows[0].id,
        firstName: dbResult.rows[0].first_name,
        lastName: dbResult.rows[0].last_name,
        token: currentToken,
      },
    });
  }

  /**
   *  Sign in user
   *  @param {Object} requestuest
   *  @param {Object} response
   *  @return {Object} json
   */
  static signIn(request, response) {
    const { email, password } = request.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0 || !passwordHelper.comparePasswords(password, dbResult.rows[0].password)) {
          return UsersController.passwordFailureResponse(response);
        }

        const token = generateToken({ id: dbResult.rows[0].id, isadmin: dbResult.rows[0].is_admin });
        process.env.CURRENT_TOKEN = token;

        return UsersController.loginSuccessResponse(response, token, dbResult.rows[0]);
      })
      .catch();
  }

  /**
   *  return message for non matching password in login or not found
   *  @param {Object} response
   *  @return {Object} json
   */
  static passwordFailureResponse(response) {
    return response.status(401).json({
      status: 401,
      error: 'Email or password is incorrect',
    });
  }

  /**
   *  return message for successful login
   *  @param {Object} response
   *  @return {Object} json
   */
  static loginSuccessResponse(response, currentToken, data) {
    return response.status(200).json({
      status: 200,
      data: {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        token: currentToken,
      },
    });
  }
}
export default UsersController;
