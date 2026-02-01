import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍓')

    let { exp, bank, registered } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'

    let perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://files.catbox.moe/9i5o9z.jpg')

    const userId = m.sender.split('@')[0]
    let taguser = `@${userId}`
    let phone = PhoneNumber('+' + userId)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'

    const vids = [
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4',
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4',
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    const header = [
      `╔═━★•°*"'*°•★━═╗`,
      `    ✦ ꧁𝐖𝐞𝐥𝐜𝐨𝐦𝐞꧂ ✦`,
      `╚═━★•°*"'*°•★━═╝`
    ].join('\n')

    const user = global.db.data.users[m.sender] || {};
    const country = user.country || '';
    const isPremium = user.premium || false;


    const channelRD = { 
      id: '120363417186717632@newsletter', 
      name: '𝖱𝗈𝗑𝗒 𝖡𝗈𝗍 𝖠𝖨 : 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅'
    }


    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '໒֟፝🍉 ֪𝖱𝗈𝗑𝗒-𝖠𝖨',
          body: '𝖱𝗈𝗑𝗒-𝖠𝗂 : 𝖡𝗋𝖺𝗒𝖺𝗇 𝖴𝗐𝗎 📌',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://files.catbox.moe/9i5o9z.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    const body = `
*ര ׄ 🌟 ׅ Bienvenido a, Roxy MD*
────────────────
*✨ I N F O R M A C I Ó N ✨*

*\`· ›  Nombre del Bot\`* :: RoxyBot-MD 
*\`· ›  Nombre de Usuario\`* :: ${taguser}
*\`· ›  Estado\`* :: Gratis
*\`· ›  Tiempo en línea\`*  :: ${uptime}
────────────────

*\`sі ᥱᥒᥴᥙ𝗍rᥲs ᥙᥒ ᥱrr᥆r ᥴ᥆ᥒ𝗍ᥲᥴ𝗍ᥲ ᥴ᥆ᥒ ᥱᥣ ᥆ᥕᥒᥱr\`*
*\`sі 𝗊ᥙіᥱrᥱs ᥴrᥱᥲr ᥙᥒ sᥙᑲᑲ᥆𝗍 ᥙSᥲ\`*
_#code_



𓂂𓏸  𐅹੭੭   *\`𝖣ᨣ𝗐𝗇𝗅ᨣ𝖺𝖽ᧉꭇ𝗌\`* 🍄 ᦡᦡ

ര ׄ 🍄 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘʟᴀʏ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘɪɴᴅʟ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ɪɴsᴛᴀɢʀᴀᴍ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ꜰᴀᴄᴇʙᴏᴏᴋ <link>


𓂂𓏸  𐅹੭੭   *\`𝖲ᧉ𝖺ꭇ𝖼𝗁\`* 🧃 ᦡᦡ

ര ׄ 🧃 ׅ ${usedPrefix}ʏᴛs
ര ׄ 🧃 ׅ ${usedPrefix}ᴘɪɴᴛᴇʀᴇsᴛ
ര ׄ 🧃 ׅ ${usedPrefix}ᴀᴘᴛᴏɪᴅᴇ<texto>
ര ׄ 🧃 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ
ര ׄ 🧃 ׅ ${usedPrefix}sꜱᴡᴇʙ
ര ׄ 🧃 ׅ ${usedPrefix}sᴘᴏᴛɪꜰʏ

 ׄ 🍟 ׅ ${usedPrefix}ᴍᴇɪᴏ
    
    
𓂂𓏸  𐅹੭੭   *\`𝖩𝖺𝖽ı-ᗷᨣƚ𝗌\`* 🍰 ᦡᦡ

ര ׄ 🍰 ׅ ${usedPrefix}ʙᴏᴛs
ര ׄ 🍰 ׅ ${usedPrefix}ᴄᴏᴅᴇ


𓂂𓏸  𐅹੭੭   *\`𝗈ɯ𝗇ᧉꭇ\`* 🌷 ᦡᦡ
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇɪɴɪᴄɪᴀʀ
ര ׄ 🌷 ׅ ${usedPrefix}ᴅsᴏᴡɴᴇʀ
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛɴᴀᴍᴇ
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛᴘᴘ <img>
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇsᴛᴀʀᴛ
ര ׄ 🌷 ׅ ${usedPrefix}ᴜᴘᴅᴀᴛᴇ


𓂂𓏸  𐅹੭੭   *\`𝖲ƚ𝗂𝖼𝗄ᧉꭇ\`* 🫓 ᦡᦡ

ര ׄ 🫓 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀ <img>
ര ׄ 🫓 ׅ ${usedPrefix}ʙʀᴀᴛ *<texto>*


𓂂𓏸  𐅹੭੭   *\`𝖳ᨣᨣ𝗅𝗌\`* 🍵 ᦡᦡ

ര ׄ 🍵 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ <text>
ര ׄ 🍵 ׅ ${usedPrefix}ʀᴠᴏᴄᴀʟ <audio> 🍵 ׅ ${usedPrefix}ʜᴅ

`.trim()

    const menu = `${header}\n${body}`

    const botname = '🌸◌*̥₊ Rᴏxʏ-Mᴅ ◌❐🎋༉'
    const textbot = '💖 𝙍𝙊𝙓𝙔 𝘽𝙔 𝘿𝙀𝙑 𝘽𝙍𝘼𝙔𝘼𝙉 ✨️'
    const banner = perfil
    const redes = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: body,
      gifPlayback: true,
      mentions: [m.sender],  
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender] 
    }, { 
      quoted: metaMsg 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true
//handler.limit = false;

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}