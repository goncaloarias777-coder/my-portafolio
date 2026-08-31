import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Inicializamos Resend con tu clave de API (luego la guardamos de forma segura)
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nombre, email, mensaje } = data;

    // Validación básica de campos
    if (!nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Enviamos el correo electrónico a tu casilla
    const response = await resend.emails.send({
      from: 'Portfolio Web <onboarding@resend.dev>',
      to: ['goncaloarias777@gmail.com'], // Reemplaza esto con tu email personal
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <h2>¡Tenés un nuevo cliente interesado en tu web!</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    });

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al procesar el envío del mensaje" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};