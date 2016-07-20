var express = require('express');
var app = express();

app.get('/:time', function (req, res) {
  var time = req.params.time;
  res.send({"unix":parseUnix(time), "natural":parseDate(time)});
});

app.listen(8080, function () {
  console.log('Timestamp Server listening on port 8080!');
});

function parseDate(value) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(isNaN(value)) {
      var date = new Date(Date.parse(value));
    } else {
      var date = new Date(parseInt(value*1000));
      value = monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
    }
    return (date) ? value : null;
}

function parseUnix(value) {
    if(!isNaN(value)) {
      var date = value;
    } else {
      var date = new Date(Date.parse(value));
      date = date.getMilliseconds()/1000;
    }
    return (date) ? date : null;
}