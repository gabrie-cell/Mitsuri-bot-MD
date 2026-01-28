import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } =
  (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix }) => {

  await conn.sendMessage(
    m.chat,
    { text: '*`CARGANDO MENÚ POR CATEGORÍAS...`*' },
    { quoted: m }
  )

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    )
    return imageMessage
  }

  const baseImage = 'https://raw.githubusercontent.com/El-brayan502/img/upload/uploads/e1f0c2-1769465565901.jpg'

  const menus = [
    {
      image: baseImage,
      title: 'MENU OWNER',
      code: 'MENU-OWNER',
      text: `
╭──〔 👑 MENU OWNER 〕
│
│ ${usedPrefix}update
│
╰──────────────
      `.trim()
    },
    {
      image: 'https://raw.githubusercontent.com/El-brayan502/img/upload/uploads/c3043c-1769465597861.jpg',
      title: 'MENU DOWNLOADER',
      code: 'MENU-DOWN',
      text: `
╭──〔 ⬇️ MENU DOWNLOADER 〕
│
│ ${usedPrefix}tiktok
│ ${usedPrefix}play
│ ${usedPrefix}ytmp3
│
╰──────────────
      `.trim()
    },
    {
      image: 'https://raw.githubusercontent.com/El-brayan502/img/upload/uploads/fb46db-1769467887638.jpg',
      title: 'MENU GRUPO',
      code: 'MENU-GROUP',
      text: `
╭──〔 ☃️ MENU SEARCH 〕
│
│ ${usedPrefix}tiktoksearch
│ ${usedPrefix}wikipedia
│
╰──────────────
      `.trim()
    },
    {
      image: baseImage,
      title: 'MENU ANIME',
      code: 'MENU-ANIME',
      text: `
╭──〔 🍥 MENU ANIME 〕
│
│ ${usedPrefix}anime
│ ${usedPrefix}waifu
│ ${usedPrefix}neko
│
╰──────────────
      `.trim()
    },
    {
      image: baseImage,
      title: 'MENU TOOLS',
      code: 'MENU-TOOLS',
      text: `
╭──〔 🛠️ MENU TOOLS 〕
│
│ ${usedPrefix}ping
│ ${usedPrefix}speed
│ ${usedPrefix}info
│
╰──────────────
      `.trim()
    },
    {
      image: baseImage,
      title: 'MENU JADIBOT',
      code: 'MENU-JADIBOT',
      text: `
╭──〔 🤖 MENU JADIBOT 〕
│ ${usedPrefix}bots
│ ${usedPrefix}qr
│ ${usedPrefix}code
│
╰──────────────
      `.trim()
    }
  ]

  let cards = []

  for (let menu of menus) {
    const imageMsg = await createImage(menu.image)

    cards.push({
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
      }),
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: menu.text
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '© Nagi Bot MD'
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [],
        messageParamsJson: JSON.stringify({
          limited_time_offer: {
            text: `📂 ${menu.title}`,
            url: 'https://github.com/El-brayan502',
            copy_code: menu.code,
            expiration_time: 1754613436864329
          }
        })
      })
    })
  }

  const msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: '*MENU COMPLETO ✨️*'
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
            })
          })
        }
      }
    },
    { quoted: m }
  )

  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  })
}

handler.command = ['menu', 'allmenu', 'help']
export default handler