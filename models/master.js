var connection = require('../connection');
 

function master() {
	
	//----------- Add New Job Post -----------------------------------
			this.postjob1 = function (postJob, res) {
				console.log(postJob);
				connection.acquire(function (err, con) {
					con.query('INSERT INTO `jobs`(`jobType`, `jobdesg`, `category`, `openings`, `skillLevel`, `jobDescription`, `requirements`, `salary`, `location`, `keywords`, `userid`) VALUES("'+postJob.jobType+'","'+postJob.jobdesg+'","'+postJob.category+'","'+postJob.openings+'","'+postJob.skillLevel+'","'+postJob.jobDescription+'","'+postJob.requirements+'","'+postJob.salary+'","'+postJob.location+'","'+postJob.keywords+'",'+postJob.userid+')', function (err, result) {
						console.log(err); 
						con.release();
						if (err) {
							console.log(err);
						  res.send({status: 1, message: 'user update failed'});
						} else {
						  res.send({status: 0, message: 'user  update successfully'});	  
						}
					});
				});
			}; 
			
	//----------- Update Job Post -----------------------------------
		this.postjobupdate = function(jobmod, res) {		
			connection.acquire(function(err, con) {
				var sql = con.query("update jobs set `jobType`=?, `jobdesg`=?, `category`=?, `openings`=?, `skillLevel`=?, `jobDescription`=?, `requirements`=?, `salary`=?, `location`=?, `keywords`=?   where id = ?", [jobmod[0].jobType,jobmod[0].jobdesg,jobmod[0].category,jobmod[0].openings,jobmod[0].skillLevel,jobmod[0].jobDescription,jobmod[0].requirements,jobmod[0].salary,jobmod[0].location,jobmod[0].keywords,jobmod[0].id], function(err, result) {
					con.release();
					if (err) {
						console.log(err);
					  res.send({status: 1, message: 'JobPost update failed'});
					} else {
					  res.send({status: 0, message: 'JobPost  update successfully'});	  
					}
					console.log(err);
				
				  });
			});
		};
	
	//-------------- get  JobPOst List -------------
    this.getmyjobposts = function (userid,res) {
		connection.acquire(function (err, con) {
			var sql=con.query('SELECT * from jobs where userid='+userid+' ',  function (err, result) {
				//console.log(sql);
				con.release(); 
				res.send(result);
			});
		});
	};
	
	
	//-------------- Get My JobPost data -------------
    this.Getjobpost = function (id,res) {
		connection.acquire(function (err, con) {
			var sql=con.query('SELECT * from jobs where id='+id+' ',  function (err, result) {
				//console.log(sql);
				con.release(); 
				res.send(result);
			});
		});
	};
	
	//---------- Delete JobPost -----------
	this.DeleteJob= function (id, res) {
        connection.acquire(function (err, con) {
            var sql=con.query('delete from jobs where id = ?', [id], function (err, result) {
			    //console.log(sql);
			    console.log(result);
                con.release();
                if (err) {
                    res.send({
                        status: 1,
                        message: 'Failed to delete'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: 'Deleted successfully'
                    });
                }
            });
        });
    };

	
}

module.exports = new master();