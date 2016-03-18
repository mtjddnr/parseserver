var config = require("./config.js");
var child_process = require('child_process');

var serverIdx = 1;
function createServer(conf) {
        return {
                config: conf,
                process: null,
                serverId: serverIdx++,
                timeout: 0
        };
}

function runServer(server) {
        if (server.process != null) server.process.kill('SIGINT');
        server.process = child_process.fork(__dirname + '/parse.js');
        server.timeout = 0;
        server.process.on('exit', function(code, signal) {

        });
        server.process.on('message', function(message) {
                server.timeout = 0;
        });
        server.process.send(server.config);
}

console.log(config);

var servers = [];

for (var i = 0; i < config.length; i++) {
        var server = createServer(config[i]);
        runServer(server);
        servers.push(server);
}


//process watch
setInterval(function() {
        for (var i = 0; i < servers.length; i++) {
                var server = servers[i];
                server.timeout++;
                if (server.timeout > 5) {
                        runServer(server);
                }
        }
}, 1000);

process.on('exit', function() {
        while (servers.length > 0) servers.pop().process.kill('SIGINT');
});

