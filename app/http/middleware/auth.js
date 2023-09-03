const Unauthorized = require('../../exceptions/Unauthorized');
const {decodeToken} = require('../../utils/jwtToken');

function getToken(req) {
  const token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    throw new Unauthorized('A token is required for authentication');
  }

  if (token.split(' ').length < 2) {
    throw new Unauthorized('Wrong authentication token format.');
  }
  return decodeToken(token);
}

function auth(roles, menu) {
  return (req, res, next) => {
    try {
      req.user = getToken(req);
      return next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  };
}

module.exports= {
  auth,
};
