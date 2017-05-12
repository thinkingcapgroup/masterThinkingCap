function archiveAllData(req, next) {
  var db = req.db,
      archiveAllDataQuery = "UPDATE `logFiles` SET active='inactive';  ",
      
      error = false;

  db.query(archiveAllDataQuery, function(err) {

  	if (err) {

      console.error(err.toString());
      error = 'There was an error archiving the data.';
  		next(error)
  	}

    else {
      archiveTestLogs(req,next)
    }
  });
}

function archiveTestLogs(req,next){
     var db = req.db,  
      archiveAllDataQuery2 = "UPDATE `testLog` SET active='inactive';"
      error = false;

  db.query(archiveAllDataQuery2, function(err) {

    if (err) {

      console.error(err.toString());
      error = 'There was an error archiving the data.';
      next(error)
    }

    else {
      archiveTestTime(req,next)
    }
  });
}

function archiveTestTime(req,next){
     var db = req.db,  
      archiveAllDataQuery3 = "UPDATE `testTime` SET active='inactive';"
      error = false;

  db.query(archiveAllDataQuery3, function(err) {

    if (err) {

      console.error(err.toString());
      error = 'There was an error archiving the data.';
      next(error)
    }

    else {
      archiveDemographic(req,next)
    }
  });
}

function archiveDemographic(req,next){
     var db = req.db,  
      archiveAllDataQuery4 = "UPDATE `userDemographics` SET active='inactive';"
      error = false;

  db.query(archiveAllDataQuery4, function(err) {

    if (err) {

      console.error(err.toString());
      error = 'There was an error archiving the data.';
      next(error)
    }

    else {
      archiveVideo(req,next)
    }
  });
}

function archiveVideo(req,next){
     var db = req.db,  
      archiveAllDataQuery3 = "UPDATE `videoLog` SET active='inactive';"
      error = false;

  db.query(archiveAllDataQuery3, function(err) {

    if (err) {

      console.error(err.toString());
      error = 'There was an error archiving the data.';
      next(error)
    }

    else {
      next(err)
    }
  });
}



module.exports = archiveAllData;
