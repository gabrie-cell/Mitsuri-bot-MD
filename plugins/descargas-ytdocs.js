// By WillZek 
import fetch from 'node-fetch'
import yts from 'yt-search'
import { yta, ytv } from '../lib/ytdl-sv.js'

let handler = async (m, { conn, args, command }) => {
if (!args[0]) return m.reply('🪐 Ingresa un enlace o nombre de YouTube.')

const isLink = args[0].includes('youtube.com') || args[0].includes('youtu.be')
const query = args.join(' ')
const url = isLink ? args[0] : null
const search = await yts(query)
const video = search.videos[0]

if (!video) return m.reply('🪐 Video no encontrado.')

const info = `*╭─「 🪐 ${botname} • ${command} 」*
│ ❒ *Título:* ${video.title}
│ ✶ *Autor:* ${video.author.name}
│ ⤿ *Duración:* ${video.timestamp}
│ ⤿ *Publicado:* ${video.ago}
│ ⤿ *Vistas:* ${video.views.toLocaleString()}
│ ⤿ *Canal:* ${video.author.url.replace('https://', '')}
*╰─〔 Tipo: Descarga 〕*

> ${dev}`

await m.react(rwait)
await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: info }, { quoted: m })

const sendDoc = async (fileUrl, fileName, mimetype) => {
await conn.sendMessage(m.chat, { document: { url: fileUrl }, fileName, caption: `> ${dev}`, mimetype }, { quoted: m })
await m.react(done)
}

const sendFallback = async (type) => {
try {
const result = type === 'mp3' ? await yta(video.url) : await ytv(video.url)
if (!result || !result.result) throw 'Scraper zzz'

const link = result.result.download || result.result.dl || result.result.url
if (!link) throw 'No hay links de descargas'

await sendDoc(link, `${video.title}.${type}`, type === 'mp3' ? 'audio/mpeg' : 'video/mp4')
} catch (e) {
m.reply(`🪐 Error con las fuentes.\n${e.message}`)
}}

if (/yt(mp3|adoc|mp3doc|mp3doc)/i.test(command)) {
try {
const api = `https://api.stellarwa.xyz/dow/ytmp3?url=${args[0]}&apikey=BrunoSobrino`
const res = await fetch(api)
const json = await res.json()
const link = json?.result?.dl || json?.data?.dl
if (!link) throw 'No hay link de descarga'
await sendDoc(link, `${video.title}.mp3`, 'audio/mpeg')
} catch {
await sendFallback('mp3')
}}

if (/yt(mp4|vdoc|mp4doc)/i.test(command)) {
try {
const api = `https://api.stellarwa.xyz/dow/ytmp4?url=${args[0]}&apikey=BrunoSobrino`
const res = await fetch(api)
const json = await res.json()
const link = json?.result?.dl || json?.data?.dl
if (!link) throw 'No hay link de descarga'
await sendDoc(link, `${video.title}.mp4`, 'video/mp4')
} catch {
await sendFallback('mp4')
}}}

handler.help = ['ytmp3doc', 'mp3doc', 'ytmp4doc', 'mp4doc', 'ytadoc', 'ytvdoc']
handler.tags = ['descargas']
handler.command = ['ytmp3doc']

export default handler