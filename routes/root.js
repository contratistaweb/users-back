'use strict'

const fs = require("fs");
const path = require("path");
module.exports = async function (fastify, opts) {
  fastify.get('/', async function(request, reply) {
    const bufferIndexHtml = fs.readFileSync(path.join(__dirname+'/../app/')+'index.html')
    return reply.type('text/html').send(bufferIndexHtml)
  })
}
