import axios from 'axios'

const tiktokCache = new Map()

const handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '*🥷 ¿Qué deseas buscar en el mundo virtual de TikTok? 🎋*',
      m
    )
  }

  await m.react('💻')

  try {
    const isTikTokUrl = /tiktok\.com\/.+/i.test(text)
    let videoData

    if (isTikTokUrl) {
      const { data } = await axios.get(
        `https://www.tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`
      )

      videoData = data?.data
    } else {
      const { data } = await axios.post(
        'https://tikwm.com/api/feed/search',
        {
          keywords: text,
          count: 1,
          cursor: 0,
          HD: 1
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      )

      videoData = data?.data?.videos?.[0]
    }

    if (!videoData?.play) {
      return conn.reply(m.chat, '*🎋 No se encontró contenido válido.*', m)
    }

    const cacheId = `${m.sender}_${Date.now()}`
    tiktokCache.set(cacheId, videoData)

    const infoText = buildInfo(videoData)

    await conn.sendMessage(
      m.chat,
      {
        text: infoText,
        footer: 'Selecciona una acción',
        buttons: [
          {
            buttonId: `${usedPrefix}ttget download ${cacheId}`,
            buttonText: { displayText: '▶️ Descargar video' },
            type: 1
          },
          {
            buttonId: `${usedPrefix}ttget send ${cacheId}`,
            buttonText: { displayText: '📤 Mandar video' },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

    await m.react('✔️')
  } catch (err) {
    await m.react('✖️')
    await conn.reply(
      m.chat,
      `⚠︎ Error inesperado.\n> Usa *${usedPrefix}report*\n\n${err.message}`,
      m
    )
  }
}

handler.help = ['tiktok', 'tt']
handler.tags = ['descargas']
handler.command = ['tiktok', 'tt']
handler.group = true

export default handler

export const ttget = async (m, { conn, args }) => {
  const [action, id] = args
  const data = tiktokCache.get(id)

  if (!data) {
    return conn.reply(m.chat, '⚠️ El contenido expiró.', m)
  }

  if (action === 'download') {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: data.play },
        caption: '✔️ Video descargado'
      },
      { quoted: m }
    )
  }

  if (action === 'send') {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: data.play },
        caption: '📤 Video enviado'
      },
      { quoted: m }
    )
  }

  tiktokCache.delete(id)
}

ttget.command = ['ttget']
function buildInfo(v) {
  return (
    `✨ *Resultados encontrados*\n\n` +
    `📌 *Título:* ${v.title || 'No disponible'}\n` +
    `☕ *Autor:* ${v.author?.nickname || v.author?.unique_id || 'Desconocido'}\n` +
    `⏱️ *Duración:* ${v.duration || '?'}s\n` +
    (v.created_at ? `📅 *Fecha:* ${v.created_at}\n` : '') +
    `\n👇 Elige qué hacer con el video`
  )
}