import { validationResult } from 'express-validator';
import conn from '../helpers/conn';

const client = conn();
client.connect();
/**
 *    @fileOverview Class to validate user signup inputr
 *    @class ValidateUser
 *    @exports ValidateUser
 */

class Validator {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validatorError(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  }


  /**
   * check if user M already exists
   * @param {String} email
   * @return {object}
   */
  static checkDuplicateEmail(request, response, next) {
    const query = `SELECT email FROM users WHERE email ='${request.body.email}'`;
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rows[0]) {
          return response.status(400)
            .json({
              status: 400,
              error: 'E-mail already in use',
            });
        }
        return next();
      }).catch((error) => {
        response.status(500).send('Server Error');
      });
  }
}

export default Validator;
