function getAllResearchDemoData (req, next) {
  var db = req.db,
      getAllResearchData = 'SELECT * FROM `userDemographics`;',
      error = false;

  db.query(getAllResearchData, function(err, result) {
  	if (err) {
      console.error(err.toString());
      error = 'There was an error retrieving the research data.';
  		next(error, result)
  	}

    else if (!result[0]) {
      error = 'No Research Data found!';
      next(error, result);
    }

    else {
      next(err, result);
    }
  });
}

module.exports = getAllResearchDemoData;
