 var master = require('./models/master');
 var user = require('./models/user');

module.exports = {
   configure: function(app) {
	    
		//------------Check User Credentials-----------
		    app.post('/api/userlog/', function (req, res) {
              user.userlog(req.body,res);
            });
		
		//--------------Add New job Post  -----------------  
			app.post('/api/postjob1/', function(req, res) {
				master.postjob1(req.body, res); 
			});	
			
		//--------------Update my job Post  -----------------  
		app.post('/api/postjobupdate/', function(req, res) {
			master.postjobupdate(req.body, res); 
		});		
			
		//----------- Posted job list -----------------	
			app.get('/api/getmyjobposts/:userid', function (req, res) {
				master.getmyjobposts(req.params.userid,res);
			});
			
		//----------- Get Posted job  -----------------	
		app.get('/api/Getjobpost/:id', function (req, res) {
			master.Getjobpost(req.params.id,res);
		}); 
			
		//-----------Delete jobpost -------------
			app.delete('/api/DeleteJob/:id', function(req, res) {
			    master.DeleteJob(req.params.id, res); });
	
	}
  
};