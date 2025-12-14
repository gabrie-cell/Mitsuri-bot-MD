const yts = require('yt-search');

module.exports = {
    command: 'ytsearch',
    description: 'Busca videos en YouTube y muestra resultados.',
    run: async (sock, message, args) => {
        try {
            const text = args.join(" ");
            if (!text) {
                return message.reply("⛅ Por favor, ingresa una búsqueda de YouTube.");
            }

            await message.reply("⏳ Buscando en YouTube...");

            const results = await yts(text);
            const videos = results.videos;

            if (!videos || videos.length === 0) {
                return message.reply("🌴 No se encontraron resultados en YouTube.");
            }

            const listText = videos.slice(0, 5).map((v, i) => {
                return `「✦」Resultados de la búsqueda para *<${text}>*

📌 *${i + 1}. ${v.title}*
> 🍬 Canal » *${v.author.name}*
> 🕝 Duración » *${v.timestamp}*
> 📆 Subido » *${v.ago}*
> 👀 Vistas » *${v.views}*
> 🔗 Enlace » ${v.url}`;
            }).join("\n\n••••••••••••••••••••••••••••••••••••\n\n");

            await sock.sendMessage(message.chat, {
                image: { url: videos[0].thumbnail },
                caption: listText
            }, { quoted: message });

        } catch (err) {
            console.error("Error en ytsearch:", err);
            await message.reply("🌴 Ocurrió un error al buscar en YouTube.");
        }
    }
};