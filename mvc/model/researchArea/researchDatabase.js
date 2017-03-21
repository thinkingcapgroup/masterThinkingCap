function researchDatabase (req, data, next) {
  var db = req.db;
  var getAllUsersQuery = '';
  var  error = false;
  var  result = "";

  if(data.type == 'userName'){
    getAllUsersQuery = 'SELECT * FROM `users` WHERE userName = "'+ data.search+'";';
  }
  else if(data.type == 'userId'){
    getAllUsersQuery = 'SELECT * FROM `users` WHERE userId = '+ parseInt(data.search)+';';

  }
  else if(data.type == 'role'){
    getAllUsersQuery = 'SELECT * FROM `users` WHERE role = '+ data.search+';';
  }
  else{
    error = 'Error - wrong search type';
  }
 console.log(getAllUsersQuery)
  db.query(getAllUsersQuery, function(err, result) {
    if (err) {
      console.error(err.toString());
      error = 'There was an error retrieving the data - please find an administrator.';
      next(error, result)
    }
    else {
      console.log(result)
      next(error, result);
    }
  });


}

module.exports = researchDatabase;

