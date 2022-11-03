'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/:id', function(req, reply) {
    fastify.mysql.query(
        'SELECT * FROM users WHERE id=?', [req.params.id],
        function onResult (err, result) {
          reply.send(err || result)
        }
    )
  })
}
