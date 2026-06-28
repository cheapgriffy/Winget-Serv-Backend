// test/auth.test.mjs
// Unit tests for the `auth` middleware.
// - First test validates behavior when Authorization header is missing.
// - Second test mocks `jsonwebtoken.verify` to simulate an invalid token.
import { test, expect, vi } from 'vitest'
import auth from '../src/middlewares/auth.js'
import jwt from 'jsonwebtoken'

// Missing token should return 401 with a 'Missing Token' message.
test('auth middleware returns 401 when missing token', () => {
    const req = { headers: {} }
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    const next = vi.fn()

    auth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Missing Token' }))
    expect(next).not.toHaveBeenCalled()
})

// Invalid token path: mock `jwt.verify` to throw and expect 401 'Invalid Token'.
test('auth middleware returns 401 on invalid token', () => {
    const req = { headers: { authorization: 'Bearer badtoken' } }
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    const next = vi.fn()

    const spy = vi.spyOn(jwt, 'verify').mockImplementation(() => { throw new Error('bad') })

    auth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid Token' }))

    spy.mockRestore()
})
