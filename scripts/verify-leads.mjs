import assert from 'node:assert/strict'
import { POST } from '../api/leads.ts'

const payload = { name: 'Pessoa Exemplo', email: 'pessoa@example.com', message: 'Gostaria de conversar sobre um projeto.', origin: 'Produto: Financeiro' }
const request = (body) => new Request('http://localhost/api/leads', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
})

assert.equal((await POST(request({ ...payload, name: 'A' }))).status, 400)
assert.equal((await POST(request({ ...payload, email: 'invalido' }))).status, 400)
assert.equal((await POST(request({ ...payload, message: 'curta' }))).status, 400)

delete process.env.RESEND_API_KEY
delete process.env.LEAD_FROM_EMAIL
delete process.env.LEAD_TO_EMAIL
assert.equal((await POST(request(payload))).status, 503)

process.env.RESEND_API_KEY = 'test-key'
process.env.LEAD_FROM_EMAIL = 'Aegon <site@example.com>'
process.env.LEAD_TO_EMAIL = 'destino@example.com'

let sent
globalThis.fetch = async (url, options) => {
  sent = { url, options }
  return new Response('{}', { status: 200 })
}

assert.equal((await POST(request({ ...payload, website: 'spam.example' }))).status, 200)
assert.equal(sent, undefined)
assert.equal((await POST(request(payload))).status, 200)
assert.equal(sent.url, 'https://api.resend.com/emails')
assert.equal(JSON.parse(sent.options.body).reply_to, payload.email)
assert.match(JSON.parse(sent.options.body).text, /Produto: Financeiro/)

globalThis.fetch = async () => new Response('{}', { status: 422 })
assert.equal((await POST(request(payload))).status, 502)

process.stdout.write('Fluxo de leads: validação, configuração, honeypot, entrega e falha verificados.\n')
