let handler = async (m, { conn }) => {
  let tiempo = Date.now()
  let mensaje = await conn.sendMessage(m.chat, 'Pong!', { quoted: m })
  let tiempoFinal = Date.now() - tiempo
  await conn.sendMessage(m.chat, `Tiempo de respuesta: ${tiempoFinal} ms`, { quoted: mensaje })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping']

export default handler