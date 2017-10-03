var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var fs = require('fs');

var pages = [{
        route: '',
        output: 'Home'
    },
    {
        route: 'About',
        output: 't'
    },
    {
        route: 'Another page',
        output: function() {
            return 'Here\'s ' + this.route;
        }
    }
];
http.createServer(function(request, response) {
    var lookup = path.basename(decodeURI(request.url));
    pages.forEach(function(page) {
        if (page.route === lookup) {
            console.log("  Requisição no servidor");
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(typeof page.output === 'function' ? page.output() : page.output);
        }
    });
    if (!response.finished) {
        response.writeHead(404);
        response.end('Page Not Found');
    }
}).listen(8888);
console.log('  Servidor iniciado\n  Endereço:127.0.0.1:8888 \n ', Date(), "\n");
