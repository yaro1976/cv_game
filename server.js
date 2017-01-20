// Server configuration


var express = require('express');
var app = express();

// Define port
var port = process.env.PORT;
var ip = process.env.IP;


app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
   console.log("req=",req," response=",res); 
});


app.listen(port, () => {
    console.log('Server started on : ', ip,':',port);
})