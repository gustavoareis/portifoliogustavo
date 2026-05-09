import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email API key não configurada.' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const emailSubject = subject ? `Contato portfólio: ${subject}` : 'Novo contato pelo portfólio'

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? 'gustavoalreisz@gmail.com',
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>Novo contato pelo portfólio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Assunto:</strong> ${escapeHtml(subject || 'Não informado')}</p>
          <hr />
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: error.message ?? 'Não foi possível enviar a mensagem.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ error: 'Não foi possível processar a mensagem.' }, { status: 500 })
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
