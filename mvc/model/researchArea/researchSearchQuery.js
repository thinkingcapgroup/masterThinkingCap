var fs = require('fs');

function researchSearchQuery(req, data, next) {
  var db = req.db,
      holdArray = fs.readFileSync("logInfo/userAction.txt").toString().split('\n');;
      searchQuery = '',
      err = false;
      resultArray = [];

  if(data.type == 'userName'){
    for(var x =0; x < holdArray.length; x++){
      var line = [];
      line = holderArray[x].split("-");
      if(line[4] == data.search||line[5] == data.search){
        resultArray.push(holdArray[x]);
      }
    }
  }
  else if (data.type == 'userId'){
    for(var x =0; x < holdArray.length; x++){
      var line = [];
      line = holderArray[x].split("-");
      if(line[1] == data.search){
        resultArray.push(holdArray[x]);
      }
    }
  }
  else if (data.type == 'gameSessionNum'){

  }
  else{
    err = "Not executable";
  
  }

  next(err,resultArray);
   
}

module.exports = researchSearchQuery;
