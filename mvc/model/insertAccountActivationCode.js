module.exports = function(req, data, next){
  var db = req.db,
      insertAccountActivationCode = 'INSERT INTO accountActivationCodes (userId, activationCode) VALUES (?, ?);'
      error = false;

  db.query(insertAccountActivationCode, [data.userId, data.activationCode],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}
