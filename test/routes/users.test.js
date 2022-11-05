'use strict'

const {build, config} = require('./../helper')
const {test} = require("tap");
let usersCount = 0;

// section POST /users
test('GET /users', async (test) => {
    const app = await build(test);
    const res = await app.inject({
        url: '/users',
        method: 'POST',
        payload: {
            firstname: 'ut',
            lastname: 'ut',
            age: Math.random()*10,
            email: 'ut',
            phone: 'ut',
        }
    });
    test.equal(res.statusCode, 200);
    test.ok(res);
    test.end();
})

// section GET /users
test('GET /users', async (test) => {
    const app = await build(test);
    const res = await app.inject({
        url: '/users',
        method: 'GET'
    });
    usersCount = res.payload.length;
    test.equal(res.statusCode, 200);
    test.ok(res);
})

// section GET /users/:id
test('GET user for id /users/$id', async (test) => {
    const app = await build(test);
    const res = await app.inject({
        url: `/users/${usersCount}`,
        method: 'GET'
    });
    test.equal(res.statusCode, 200);
    test.ok(res);
    test.end();
})

// section PATCH /users/:id
test('The age property should be a number', async (test) => {
    const app = await build(test);
    const res = await app.inject({
        url: `/users/${usersCount}`,
        method: 'PATCH',
        payload: {age: Math.random()*10}
    });
    test.equal(res.statusCode, 200);
    test.ok(res);
    test.end();
})

// section DELETE /users/:id
test('DELETE user for id /users/$id', async (test) => {
    const app = await build(test);
    const res = await app.inject({
        url: `/users/${usersCount}`,
        method: 'DELETE',
    });
    test.equal(res.statusCode, 200);
    test.ok(res);
    test.end();
})


