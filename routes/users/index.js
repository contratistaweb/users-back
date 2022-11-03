'use strict'

module.exports = async function (fastify, opts) {

    fastify.post('/', function (req, reply) {
        fastify.mysql.query(
            `INSERT INTO users ( firstname, lastname, age, email, phone, deleted) VALUES (  '${req.body.firstname}', '${req.body.lastname}', ${req.body.age}, '${req.body.email}', '${req.body.phone}', 0);`,
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.get('/', function (req, reply) {
        fastify.mysql.query(
            'SELECT * FROM users',
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.get('/:id', function (req, reply) {
        fastify.mysql.query(
            'SELECT * FROM users WHERE id=?', [req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.patch('/:id', function (req, reply) {
        fastify.mysql.query(
            `UPDATE users SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', age = ${req.body.age}, email = '${req.body.email}', phone = '${req.body.phone}', deleted = '${req.body.deleted || 0}' WHERE id=?`,[req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })


}
