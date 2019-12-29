var connection = require('../connection');
 

function user() {
	
	//----------- Check User Credentials -----------------------------------
			this.userlog = function(user,res) { 
				 connection.acquire(function (err, con) {
					var sql=con.query('select * from usermaster where  emailid="'+user.emailid+'" and password="'+user.password+'"    ',  function (err, result) {
							console.log(sql);
							console.log(err);
							con.release();
							res.send(result);							 
					
					});
				});  
			};

	
}

module.exports = new user();