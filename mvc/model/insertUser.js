module.exports = function(req, data, next){
  var db = req.db,
      insertUser = 'INSERT INTO users ' +
                    '(userName, email, firstName, lastName, displayName, ' +
                    'gender, ethnicity, race, ' +
                    'major, schoolYear, deafCommunity, languages, ' +
                    'mathCoursesTaken, statisticsCoursesTaken, readingLevel, ' +
                    'research, role) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
      error = false;


  db.query(insertUser, [data.userName, data.email, data.firstName, data.lastName,
                        data.displayName, data.gender, data.ethnicity, data.race,
                        data.major, data.schoolYear, data.deafCommunity, data.languages,
                        data.mathCoursesTaken, data.statisticsCoursesTaken, data.readingLevel,
                        data.research, data.role],function(err, result) {
  	if (err) {
      error = err.toString();
  		next(err, result)
  	}
    else {
      next(err, result);
    }
  });
}