export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const data = await request.json()
    const { name, email, project, message, captchaToken } = data

    if (!name || !email || !project || !message || !captchaToken) {
      return new Response(JSON.stringify({ error: 'Todos los campos son obligatorios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.RECAPTCHA_SECRET_KEY,
        response: captchaToken
      })
    })

    const captchaData = await captchaRes.json()

    if (!captchaData.success) {
      return new Response(JSON.stringify({ error: 'CAPTCHA inválido. Intenta de nuevo.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const emailjsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        template_params: {
          title: project,
          name: name,
          email: email,
          message: message,
          time: new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' })
        }
      })
    })

    if (!emailjsRes.ok) {
      const errText = await emailjsRes.text()
      console.error('EmailJS error:', errText)
      return new Response(JSON.stringify({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Server error:', err)
    return new Response(JSON.stringify({ error: 'Error interno del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
