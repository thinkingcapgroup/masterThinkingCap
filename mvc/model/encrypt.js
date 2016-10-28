module.exports = function (string) {
  var crypto = require('crypto'),
      cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq'),
      crypted = cipher.update(string, 'utf-8', 'hex');

  crypted += cipher.final('hex');

  return crypted;
};
