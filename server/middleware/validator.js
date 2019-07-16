import { validationResult } from 'express-validator';

/**
 *    @fileOverview Class to validate user signup inputr
 *    @class ValidateUser
 *    @exports ValidateUser
 */

class ValidateUser {
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
}

export default ValidateUser;
