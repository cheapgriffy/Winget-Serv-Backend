// test/script.helpers.test.mjs
// Unit tests for small, pure helper functions in `script.controller`.
// These tests are intentionally isolated: no DB, no network — just pure JS inputs/outputs.
import { test, expect } from 'vitest'
import scriptController from '../src/controllers/script.controller.js'

const { detectOS, isTerminalClient, renderBash, renderPowerShell, escapeHtml } = scriptController

// detectOS output check
test('detectOS recognizes windows, macos, linux and unknown', () => {
    expect(detectOS('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('windows')
    expect(detectOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('macos')
    expect(detectOS('Mozilla/5.0 (X11; Linux x86_64)')).toBe('linux')
    expect(detectOS('Netscape type shit')).toBe('unknown')
})


test('isTerminalClient detects common terminal UAs', () => {
    expect(isTerminalClient('curl/7.64.1')).toBe(true)
    expect(isTerminalClient('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe(false)
})

// check bash "header" injection | array to powershell output
test('renderBash and renderPowerShell include script name and content', () => {
    const script = { name: 'MyScript', description: 'desc', content: ['echo hi', 'echo bye'] }
    const bash = renderBash(script)
    expect(bash).toContain('#!/usr/bin/env bash')
    expect(bash).toContain('# MyScript')
    expect(bash).toContain('echo hi')

    const ps = renderPowerShell(script)
    expect(ps).toContain('# MyScript')
    expect(ps).toContain('echo "')
    expect(ps).toContain('echo hi')
})

// webview xss protection check
test('escapeHtml escapes special characters', () => {
    const raw = "<div>\"&'</div>"
    const out = escapeHtml(raw)
    expect(out).not.toContain('<')
    expect(out).toContain('&lt;')
    expect(out).toContain('&quot;')
})
