module.exports = function(req, data, next)
{
    var db = req.db;
    var saveTest = 'INSERT INTO userConsent (userId,name,date,studentID) VALUES (?,?,?,?)'; 
    
    error = false;
    
    db.query(saveTest, [data.userId, data.name, data.date, data.stuID],function(err, result) 
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