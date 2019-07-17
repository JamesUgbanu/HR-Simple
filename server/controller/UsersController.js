import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../helpers/conn';
import generateToken from '../helpers/token';
import transport from '../helpers/mailTransporter';
import config from '../config/config';

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
        const currentToken = generateToken({ id: dbResult.rows[0].id, email: dbResult.rows[0].email });
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
        error: 'Inalid token',
      });
    }
  }
}
export default UsersController;
