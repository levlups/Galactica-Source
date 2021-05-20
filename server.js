console.log('my socket is running');
var fs = require("fs");
var express=require('express');
var app=express();


var server=app.listen(3000);




app.use(express.static('docs/'));


