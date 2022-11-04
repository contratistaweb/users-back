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
        const str = () => {
            const keys = Object.keys(req.body);
            let str = '';
            keys.forEach((key, index) => {
                str += ' '+key+' = "'+ req.body[key]+ (index+1 === keys.length?'" ':',');
            })
            return str;
        }
        fastify.mysql.query(
            `UPDATE users SET ${str()} WHERE id=?`,[+req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.delete('/:id', function (req, reply) {
        fastify.mysql.query(
            `UPDATE users SET deleted = 1 WHERE id=?`,[req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })


}
