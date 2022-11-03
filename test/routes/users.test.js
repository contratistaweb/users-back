'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('users is loaded', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/users'
  })
  t.equal(res.payload, 'this is an users')
})

// inject callback style:
//
// test('users is loaded', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/users'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an users')
//   })
// })
