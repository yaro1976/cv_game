// Server configuration


var express = require('express');
var app = express();

// Define port
var port = process.env.PORT || "8080";
var ip = process.env.IP || "0.0.0.0";


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send(__dirname + '/public/index.html');
    console.log("req=", req, " response=", res);
});


app.listen(port, () => {
    console.log('Server started on : ', ip, ':', port);
})