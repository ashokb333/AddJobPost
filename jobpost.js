var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken'); 
var morgan      = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var port=8080;
  
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(morgan('dev'));
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('tokenSecret', 'secr3t');
app.use(express.static(path.join(__dirname, './www')));

app.get('/', function(req, res) {
	res.send('Hello! The API is up and running');
});


app.post('/', function(user,emailid,res) {
	console.log(user+'//'+emailid);
	/* connection.acquire(function (err, con) {
		var sql=con.query('select * from usermaster where  emailid="'+user.emailid+'" and password="'+user.password+'"    ',  function (err, result) {
				console.log(sql);
				console.log(err);
				con.release();
				res.send(result);							 
		
		});
	}); */
});
connection.init();
routes.configure(app);

var server = app.listen(8080, function() {
  console.log('Server listening on port ' + server.address().port);
});