var express = require('express');
var fs = require('fs');

var app = express();

app.get('/timestamp', function(req, res) {
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    var fileStream = fs.createReadStream('./public/index.html');
    fileStream.pipe(res);
});

app.get('/timestamp/:time', function(req, res) {
  var time = req.params.time;
  res.send({
    "unix": parseUnix(time),
    "natural": parseDate(time)
  });
});

app.listen(3030, function() {
  console.log('Timestamp Server listening on port 3030!');
});

function parseDate(value) {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = null;
  if (isNaN(value)) {
    date = new Date(Date.parse(value));
  }
  else {
    date = new Date(parseInt(value) * 1000);
  }
  return checkDate(date) ? monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() : null;
}

function parseUnix(value) {
  var date = null;
  if (!isNaN(value)) {
    date = new Date(parseInt(value) * 1000);
  }
  else {
    date = new Date(Date.parse(value));
  }
  return checkDate(date) ? date.getTime() / 1000 : null;
}

function checkDate(date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return !isNaN(date.getTime());
  }
  else {
    return false;
  }
}