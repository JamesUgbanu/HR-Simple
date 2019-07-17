import rules from './validationRules';
/**
 *    @fileOverview Class to hold general validation methods
 *    @class ValidationHelper
 *    @exports ValidationHelper
 */

class ValidateHelper {
/**
   *  * check if email is valid
   *  * @param {Object} request
   *  * @return {boolean} true
   * */
  static checkValidEmail(email) {
    if (rules.validEmail.test(email.trim())) {
      return true;
    }
    return false;
  }
}
export default ValidateHelper;
