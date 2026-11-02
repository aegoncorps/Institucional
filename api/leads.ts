/**
 * Recebe o contato de três etapas e confirma o envio somente após o provedor aceitar a mensagem.
 * Configure RESEND_API_KEY, LEAD_FROM_EMAIL e LEAD_TO_EMAIL no ambiente da Vercel.
 */
declare const process: { env: Record<string, string | undefined> }

export async function POST(request: Request): Promise<Response> {
  const json = (status: number, body: Record<string, string>) =>
    Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

  if (Number(request.headers.get('content-length') || 0) > 12_000) {
    return json(413, { error: 'Mensagem muito longa.' })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json() as Record<string, unknown>
  } catch {
    return json(400, { error: 'Dados inválidos.' })
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''
  const origin = typeof payload.origin === 'string' ? payload.origin.trim().slice(0, 90) : ''
  const website = typeof payload.website === 'string' ? payload.website.trim() : ''

  if (website) return json(200, { status: 'received' })
  if (name.length < 2 || name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      message.length < 12 || message.length > 1500) {
    return json(400, { error: 'Confira nome, e-mail e descrição do projeto.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL
  const to = process.env.LEAD_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('Lead delivery is not configured')
    return json(503, { error: 'Entrega temporariamente indisponível.' })
  }

  const body = [
    'Novo contato pelo site Aegon v5',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Origem: ${origin || 'Contato direto'}`,
    '',
    'Projeto:',
    message,
  ].join('\n')

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Novo contato Aegon — ${name.replace(/[\r\n]/g, ' ')}`,
        text: body,
      }),
    })
    if (!result.ok) {
      console.error('Lead delivery failed', result.status)
      return json(502, { error: 'Não foi possível confirmar o envio.' })
    }
    return json(200, { status: 'received' })
  } catch (error) {
    console.error('Lead delivery failed', error)
    return json(502, { error: 'Não foi possível confirmar o envio.' })
  }
}
