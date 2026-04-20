import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const BUDGET_LABELS: Record<string, string> = {
  'sub-100': 'Under £100,000',
  '100-250': '£100,000 to £250,000',
  '250-500': '£250,000 to £500,000',
  '500plus': '£500,000+',
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
  }

  let body: {
    name:     string
    email:    string
    phone:    string
    budget:   string
    existing: string
    message:  string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, phone, budget, existing, message } = body

  if (!name?.trim() || !email?.trim() || !budget?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const budgetLabel  = BUDGET_LABELS[budget] ?? budget
  const existingText = existing === 'yes' ? 'Yes' : existing === 'no' ? 'No' : 'Not specified'

  const port = Number(SMTP_PORT ?? 587)
  const transporter = nodemailer.createTransport({
    host:             SMTP_HOST,
    port,
    secure:           false,
    requireTLS:       true,
    auth:             { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout:   5000,
    socketTimeout:     10000,
    tls:              { rejectUnauthorized: false },
  })

  try {
    await transporter.sendMail({
      from:    `"Luli Properties & Dev.co.ltd" <${SMTP_USER}>`,
      to:      SMTP_USER,
      bcc: 'yinodors@yahoo.com',
      replyTo: email,
      subject: `New investor enquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#211D18">
          <div style="border-top:3px solid #C9A24A;padding:32px 0 8px">
            <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8A8078;margin:0 0 24px">
              Luli Properties &amp; Dev.co.ltd &mdash; New Enquiry
            </p>
            <h1 style="font-size:22px;font-weight:300;margin:0 0 4px">${name}</h1>
            <p style="font-size:13px;color:#4E7050;margin:0 0 32px">${email}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:32px">
            <tr style="border-bottom:1px solid #E8E0D6">
              <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8A8078;width:40%">Phone</td>
              <td style="padding:10px 0;font-size:13px">${phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E8E0D6">
              <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8A8078">Investment Budget</td>
              <td style="padding:10px 0;font-size:13px">${budgetLabel}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8A8078">Current UK Investor</td>
              <td style="padding:10px 0;font-size:13px">${existingText}</td>
            </tr>
          </table>

          ${message ? `
          <div style="background:#FAF8F5;padding:20px;margin-bottom:32px">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8A8078;margin:0 0 10px">Message</p>
            <p style="font-size:13px;line-height:1.65;margin:0">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          <p style="font-size:11px;color:#B8ADA0;border-top:1px solid #E8E0D6;padding-top:20px;margin:0">
            Submitted via lpdc.estate &mdash; reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[contact] SMTP error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
