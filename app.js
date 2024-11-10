const http = require('http');
const dt = require('./date');
const url = require('url');

http.createServer(
    function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("the date is currently " + dt.find_date());
  res.write(req.url)
  res.end('Hello World!');

    }
).listen(8080);