var fs = require('fs')
result = 'hey'
var err = false
var arrayHolder = [];



function makePreTestExcel (req, data, next) {

//export only the field 'poo' as string
var xls = json2xls(data);

fs.writeFileSync(__dirname+'/../../../upload/allPreTestData.xlsx', xls, 'binary');
next(err, result);

}

module.exports = makePreTestExcel;

