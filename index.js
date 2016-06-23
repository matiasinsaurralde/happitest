'use strict';

const Hapi = require('hapi'),
      request = require('request')

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

server.route({
  method: 'GET',
  path: '/ip',
  handler: function( request, reply ) {
    request( 'http://whatismyip.akamai.com/', (error, response, body) => {
      console.log('got', error, response, body)
      reply(body)
    })
  }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
