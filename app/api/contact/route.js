import { NextResponse } from 'next/server'
// Sends mail through Resend if RESEND_API_KEY is set; otherwise just logs on the server.
export async function POST(req) {
  const { name, email, msg } = await req.json()
  if (!name || !/^\S+@\S+\.\S+$/.test(email || '') || !msg || msg.length < 10) return NextResponse.json({ ok: false }, { status: 400 })
  const key = process.env.RESEND_API_KEY
  if (!key) { console.log('Contact form:', { name, email, msg }); return NextResponse.json({ ok: true }) }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Portfolio <onboarding@resend.dev>', to: [process.env.CONTACT_TO_EMAIL], reply_to: email, subject: `New inquiry from ${name}`, text: `${msg}\n\nFrom: ${name} <${email}>` }),
  })
  return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 502 })
}
