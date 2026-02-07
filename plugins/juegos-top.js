let handler = async (m, { conn }) => {
  let users = Object.entries(db.data.users).filter(([_, user]) => user.puntos > 0 && user.clashroyale)
  users = users.sort((a, b) => b[1].puntos - a[1].puntos)
  let texto = '*Top 10 de mayores ganadas en Clash Royale:*\n\n'
  for (let i = 0; i < 10 && i < users.length; i++) {
    let [nombre, user] = users[i]
    texto += `${i + 1}. ${nombre.split('@s.whatsapp.net')[0]} - ${user.puntos} puntos\n`
  }
  m.reply(texto, null, { mentions: users.map(([nombre]) => nombre) })
}

handler.help = ['topclash']
handler.tags = ['juegos', 'clashroyale']
handler.command = ['topclash']

export default handler