import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const { secretKey } = config;
const errorMsg = 'not authenticated';
/**
 * @class Authenticate User
 */
class UserAuthentication {
  /**
     * Authenticate users
     *
     * @param {Object} request
     * @param {Object} response
     *
     * @param {callback} next
     *
     * @return {Object}
     */
  static authenticateUser(request, response, next) {
    try {
      const userToken = request.headers['x-access'] || request.headers.token;
      const verifiedToken = jwt.verify(userToken, secretKey);
      request.token = verifiedToken;
      return next();
    } catch (error) {
      return response.status(401).json({
        status: 401,
        error: errorMsg,
      });
    }
  }

  /**
     * check isAdmin
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     * @return {Object}
     */
  static authenticateAdmin(request, response, next) {
    try {
      const token = request.headers['x-access'] || request.headers.token || request.query.token;
      const verifiedToken = jwt.verify(token, secretKey);
      request.token = verifiedToken;

      if (!verifiedToken.user.isadmin) {
        return response.status(403).json({
          status: 403,
          error: 'unAuthorised user',
        });
      } return next();
    } catch (error) {
      return response.status(401).json({
        status: 401,
        error: errorMsg,
      });
    }
  }
}

export default UserAuthentication;