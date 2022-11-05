'use strict'

module.exports = async function (fastify, opts) {

    fastify.str = (req) => {
        const keys = Object.keys(req.body);
        let str = '';
        keys.forEach((key, index) => {
            str += ' ' + key + (key === 'age' ? '= ' : " = '") + (key === 'age' ? +req.body[key] : req.body[key]) + (key === 'age' ? '' : "'")+(index + 1 === keys.length ?'' : ",");
        })
        return str;
    }

    fastify.post('/', function (req, reply) {
        fastify.mysql.query(
            `INSERT INTO users ( firstname, lastname, age, email, phone, deleted) VALUES (  '${req.body.firstname}', '${req.body.lastname}', ${req.body.age}, '${req.body.email}', '${req.body.phone}', 0);`,
            function onResult(err, result) {
                reply.send(err || result)
            })
    })

    fastify.get('/', function (req, reply) {
        fastify.mysql.query(
            'SELECT * FROM users WHERE deleted = 0',
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.get('/:id', function (req, reply) {
        fastify.mysql.query(
            'SELECT * FROM users WHERE deleted=0 && id=?', [req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.patch('/:id', function (req, reply) {

        fastify.mysql.query(
            `UPDATE users SET ${fastify.str(req)} WHERE id=?`, [+req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.delete('/:id', function (req, reply) {
        fastify.mysql.query(
            `UPDATE users SET deleted = 1 WHERE id=?`, [req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })


}
