const http = require('http');
const dt = require('./date');
const url = require('url');
const fs = require('fs');

http.createServer(
    function (req, res) {
    
    fs.readFile('demo.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("the date is currently " + dt.find_date());
        res.write(data)
        return res.end();
    })


    }
).listen(8080);