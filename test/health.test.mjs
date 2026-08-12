// test/health.test.mjs
// Simple integration test for the public health route.
// Uses `supertest` to exercise the router without starting the full server.
import request from 'supertest'
import express from 'express'
import router from '../src/routes/health.route.js'
import { test, expect } from 'vitest'

// Verify that the health endpoint responds with a 200 and expected payload.
test('GET / returns API is ONLINE', async () => {
    const app = express()
    app.use('/', router)
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('API is ONLINE')
})
