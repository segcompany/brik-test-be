const SuccessResult = require('../../utils/SuccessResult');
const authService = require('../services/authService');

async function login(req, res) {
  const data = await authService.signInWithEmail(req.body);
  return SuccessResult.make(res).sendMessageData(data, 'Berhasil Masuk');
}

module.exports = {
  login,
};
