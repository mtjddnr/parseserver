var express = require('express');
var fs = require('fs');
var unixSocket = require("unix-socket");
var http = require('http');
var ParseServer = require('parse-server').ParseServer;
var app = express();

process.on('message', function(data) {
        console.log(data);

        data.config.cloud = __filename;
        var api = new ParseServer(data.config);
        app.use(data.path, api);

        var server = http.Server(app);
        var s = {
                path: [ data.listen ],
                mode: 0666
        };
        unixSocket.listen(server, s, function(r) {
                console.log(r == null ? "Ready" : r);
        });

        setInterval(function() {
                process.send(null);
        }, 1000);

});


