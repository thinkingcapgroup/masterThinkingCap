var fs = require('fs')
result = 'hey'
var err = false
var arrayHolder = [];



function makeSummaryPostExcel (req, data, next) {

//export only the field 'poo' as string
var xls = json2xls(data);

fs.writeFileSync(__dirname+'/../../../upload/summaryPostTestData.xlsx', xls, 'binary');
next(err, result);

}

module.exports = makeSummaryPostExcel;

