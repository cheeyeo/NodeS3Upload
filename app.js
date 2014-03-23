var express = require('express');
var crypto = require('crypto');
var http = require('http');
var path = require('path');

var app = express();
app.use(express.bodyParser()); // needed to read params in req.body

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


app.use(express.logger('dev'));   /* logs requests etc */
app.use(express.compress()); /* compression*/

app.get('/account', function(req,res){
	res.render('account.html');
});

app.get('/sign_s3', function(req,res){
	var object_name = req.query.s3_object_name;
	var mime_type = req.query.s3_object_type;

	var now = new Date();
	var expires = Math.ceil((now.getTime() + 10000)/1000); // 10 seconds from now
	var amz_headers = "x-amz-acl:public-read";  

	var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

  var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
  signature = encodeURIComponent(signature.trim());
  signature = signature.replace('%2B','+');

  var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;
  var credentials = {
		signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
		url: url
  };

  res.write(JSON.stringify(credentials));
  res.end();
});

app.post('/submit_form', function(req, res){
  username = req.body.username;
  full_name = req.body.full_name;
  avatar_url = req.body.avatar_url;

  // TODO: create this function
  //update_account(username, full_name, avatar_url);

  res.render('success.ejs');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});