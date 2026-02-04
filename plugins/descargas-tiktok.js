import axios from 'axios'

global.TT_CACHE = global.TT_CACHE || new Map()

const handler = async (m, { conn, text, usedPrefix, command, args }) => {

  if (command === 'ttsend') {
    const id = args[0]
    const data = global.TT_CACHE.get(id)

    if (!data) {
      return conn.reply(m.chat, '⚠️ El contenido ya expiró.', m)
    }

    await conn.reply(m.chat, '*📤 Nagi está enviando video virtual de TikTok*', m)

    await conn.sendMessage(
      m.chat,
      {
        video: { url: data.play },
        caption: '*✔️ Video enviado*'
      },
      { quoted: m }
    )

    global.TT_CACHE.delete(id)
    return
  }

  if (!text) {
    return conn.reply(
      m.chat,
      '*🥷 ¿Qué deseas buscar en el mundo virtual de TikTok? 🎋*',
      m
    )
  }

  await m.react('💻')

  try {
    let video

    if (/tiktok\.com/i.test(text)) {
      const r = await axios.get(
        `https://www.tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`
      )
      video = r.data?.data
    } else {
      const r = await axios.post(
        'https://tikwm.com/api/feed/search',
        {
          keywords: text,
          count: 1,
          cursor: 0,
          HD: 1
        },
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      )
      video = r.data?.data?.videos?.[0]
    }

    if (!video?.play) {
      return conn.reply(m.chat, '*🎋 No se encontró contenido válido*', m)
    }

    const id = Date.now().toString(36)
    global.TT_CACHE.set(id, video)

    await conn.sendMessage(
      m.chat,
      {
        text:
          `✨ *Resultados encontrados*\n\n` +
          `📌 *Título:* ${video.title || 'No disponible'}\n` +
          `☕ *Autor:* ${video.author?.nickname || video.author?.unique_id || 'Desconocido'}\n` +
          `⏱️ *Duración:* ${video.duration || '?'}s\n` +
          (video.created_at ? `📅 *Fecha:* ${video.created_at}\n` : '') +
          `\n👇 Presiona el botón para enviarlo`,
        footer: 'TikTok',
        buttons: [
          {
            buttonId: `${usedPrefix}ttsend ${id}`,
            buttonText: { displayText: '📤 Enviar video' },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

    await m.react('✔️')

  } catch (e) {
    await m.react('✖️')
    conn.reply(m.chat, '⚠️ Ocurrió un error.', m)
  }
}

handler.command = ['tiktok', 'tt', 'ttsend']
handler.tags = ['descargas']
handler.group = true

export default handler