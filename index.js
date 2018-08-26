var http = require('http');
var fs = require('fs');
var url= require('url');
const log = require('simple-node-logger').createSimpleLogger();
// Use LDAP
var ldap = require('ldapjs');


var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var querystring = require("querystring");
var config = require('./config');

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    QRS = require("./qrs");

app.use(session({ resave: true,
      saveUninitialized: true,
      secret: config.sessionSecret}));
app.use(cookieParser('Test'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// try{
  
//   if(config){
//     for(var c in config){
//       process.env[c] = config[c];
//     }
//   }
// }
// catch(err){
//   //No configuration file found. Not an issue if deploying on heroku for example
// }

process.env.appRoot = __dirname;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(__dirname+"/public"))

app.get('/', function(req, res){
 
  res.sendFile(__dirname+'/public/index.html');
});

// app.get('/login', function(req, res){
//   res.sendFile(__dirname+'/public/login2.html');
// });

app.post('/login', function(req, res){
  // QRS.getTicket(req.body.username, function(err, ticket){
  //   if (err) {
  //     res.json(err)
  //   }
  //   else {
  //     res.redirect("https://"+process.env.SENSE_SERVER+":"+process.env.SENSE_PORT+"/"+process.env.SENSE_PROXY+"/hub?qlikTicket="+ticket.Ticket);
  //   }
  // })
 
 // res.redirect("http://google.com");
 var url = config.LDAP;
 var domian = config.DOMAIN;
 var userPrincipalName = req.body.uid + domian;
 var passwd = req.body.passwd;

 var answer = {
      url: url,
      userPrincipalName: userPrincipalName,
      passwd : passwd
 }

 res.json(answer);

 //console.log(userPrincipalName);
 //console.log(passwd);
 
 // if (passwd === "") {
   // res.send("The empty password trick does not work here.");
   // return ;
 // } 
});

app.listen(3000, function(){
  log.info('listening on port 3000');
});
