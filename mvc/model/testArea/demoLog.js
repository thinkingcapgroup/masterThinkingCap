module.exports = function(req, data, next)
{
    var db = req.db;
    var saveDemo = 'INSERT INTO userDemographics (userId, name, age, schoolYear, statisticCoursesTaken, gender, deaf, ethnicity, nativeLanguage, testId) VALUES (?,?,?,?,?,?,?,?,?,?)'; 
    
    error = false;
    
    db.query(saveDemo, [data.userId, data.name, data.age, data.schoolYear, data.statisticCoursesTaken, data.gender, data.deaf, data.ethnicity,data.nativeLanguage, data.testId] ,function(err, result) 
    {
        if (err) {
        error = err.toString();
            next(err, result)
        }
        else 
        {
            next(err, result);
        }
    });
}