const menuSections = {
    '⬇️ DESCARGAS ⬇️': `
        #facebook + <url>
        #play + <texto>
        #tiktok + <url>
        #instagram + <url>
        #mediafire + <url>
        #yts + <texto>
        #mp4 + <url de yt>
        #apk + <texto>
        #spotify + <url>
        #descarga1
        #descarga2
    `,
    '🔍 BÚSQUEDAS 🔍': `
        #tiktoksearch + <texto>
        #pinterest + <texto>
        #google + <texto>
        #buscar4
    `,
    '⚙️ CONFIGURACIÓN ⚙️': `
        #antibot
        #antidelete
        #antilink
        #antilink2
        #antiprivado
        #antispam
        #antisubbots
        #antitoxic
        #antitrabas
        #antiver
        #autoaceptar
        #autorechazar
        #autoresponder
        #autosticker
    `,
    '👥 GRUPOS 👥': `
        #promote
        #demote
        #kicknum
        #setprimary
        #tag
        #advertencia
    `,
    '🛠️ TOOLS 🛠️': `
        #s
        #qc
        #brat + <texto>
        #p
        #calculadora + <ejemplo 5+7
        #toghibli
        #inspeccionar + <url>
        #wikipedia + <texto>
        #hd
    `,
    '👑 OWNER 👑': `
        #update
        #p
        #creador
        #banned <@mencion>
        #banlist
    `,
    '✨ ANIMES ✨': `
        #slap <@mencion>
        #kill <@mencion>
        #morder <@mencion>
        #bite
        #bañarse
        #enojado
        #angry <@mencion>
        #sonrojarse <@mencion>
        #blush <@mencion>
        #lengua <@mencion>
        #bleh <@mencion>
        #kiss <@mencion>
        #acurrucarse <@mencion>
        #cuddle <@mencion>
        #cry
        #cafe
        #coffee
        #clap <@mencion>
        #bored
        #aburrido
        #llorar <@mencion>
    `,
    '💰 ECONOMIA 💰': `
        #baltop
        #trabajar
        #minar
        #daily
        #transferir
        #banco
        #inventario
        #rank
        #shop
        #gamble
        #robar
        #apostar
        #lotería
        #retirar
        #semanal
        #robar
        #slut
        #slot
        #ruleta
        #pescar
        #pay
        #depositar
    `,
};

const PREFIX_SYMBOL = '🌷';

function clockString(ms) {
    if (isNaN(ms)) return '--:--:--';
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600) % 24;
    const m = Math.floor(totalSeconds / 60) % 60;
    const s = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

function buildMenuText({ name, botname, uptime, totalreg, totalCommands }) {
    const sectionsText = Object.entries(menuSections)
        .map(([title, commandsString]) => {
            
            // CAMBIO IMPORTANTE: Procesamiento de la cadena multilínea
            const commands = commandsString.trim().split('\n')
                // Limpia espacios y elimina líneas vacías
                .map(cmd => cmd.trim()) 
                .filter(cmd => cmd.length > 0);

            // Limpia los comandos eliminando los parámetros (+ <...>)
            const cleanCommands = commands.map(cmd => 
                cmd.split(' + ')[0].split(' <')[0].trim()
            );

            // Construye la lista de comandos en una sola línea
            const commandsList = cleanCommands
                .map(cmd => `${PREFIX_SYMBOL}${cmd}`)
                .join(' | ');
            
            // Retorna el bloque con el título de la sección y los comandos
            return `\n*${title}*\n> ${commandsList}`;
        })
        .join('\n---'); // Separa las secciones con una línea horizontal

    return `
¡Hola ${name}! Me llamo ${botname}

╭━━「 𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓 」━━
┃ 👑 *Activo:* ${uptime}
┃ 👥 *Usuarios:* ${totalreg}
┃ 📚 *Comandos:* ${totalCommands}
┃ 📣 *Canal:
https://whatsapp.com/channel/0029Vb6nOKBD8SDp0aFtCD3R
╰━━━━━━━━━━━━━━━

¿*Quieres ser un sub bot?
Utiliza* *#qr* ó *#code*

---
✦ Lista de comandos:
${sectionsText}
---

> © Powered by Staff isagi Bot
`.trim();
}

let handler = async (m, { conn }) => {
    const userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    const name = conn.getName(userId);
    const _uptime = process.uptime() * 1000;

    const metrics = {
        name: name,
        botname: global.botname || 'Isagi Bot',
        uptime: clockString(_uptime),
        totalreg: Object.keys(global.db?.data?.users || {}).length,
        totalCommands: Object.values(global.plugins || {}).filter((v) => v.help && v.tags).length,
    };

    const menuText = buildMenuText(metrics);

    const videoUrl = 'https://files.catbox.moe/oakq7t.mp4';

    await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        gifPlayback: true,
        caption: menuText,
        contextInfo: {
            externalAdReply: {
                title: 'Isagi - Bot',
                body: metrics.botname,
                thumbnailUrl: 'https://files.catbox.moe/6orur7.jpg',
                mediaType: 1,
            },
            mentionedJid: [m.sender, userId],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.canalIdM?.[0] || '',
                newsletterName: 'Isagi - MD',
                serverMessageId: -1
            }
        }
    }, { quoted: m });
};


handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];
handler.register = true;

export default handler;
