  
function deleteSave()
{
	$.post('/editaccount/reset');
	$.post('/editaccount/resetLog');
}