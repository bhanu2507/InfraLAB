/**
 * Created by bhanu.mokkala on 2/20/2017.
 */
var express   = require("express");
//var mysql     = require('mysql');
var path      = require('path');

var app = express();


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(jsonParser);

ostack = require('./server/openstack');
wmi = require('./server/wmi');

app.get('/getcompulist', ostack.getcompulist);
app.get('/getimagelist', ostack.getimages);
app.get('/getflavorlist', ostack.getflavors);
app.post('/createserver', ostack.createserver);
app.get('/getfloatingip', ostack.getfloatingip);
app.get('/getaccesskey', ostack.generateaccesskey);

app.get('/gethvcompulist', wmi.getcompulist);

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/bower_components', express.static(__dirname + '/bower_components/'));

app.get("/",function(req,res){

    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Set port
port = process.env.PORT || 5000;

// Use public directory for static files
app.use(express.static(__dirname + '/public'));

// Include the routes module
//require('./app/routes')(app);

// Your code here
app.listen(port);
