module.exports = function(req, data, next)
{
    var db = req.db;
    var saveTest = 'INSERT INTO testLog (studentId,questionId,studentAnswer,isCorrect,testId) VALUES (?,?,?,?,?)'; 
    
    error = false;
    
    db.query(saveTest, [data.studentId, data.questionId, data.studentAnswer, data.isCorrect, data.testId] ,function(err, result) 
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