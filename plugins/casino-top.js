let handler = async (m, { conn }) => {
  let users = Object.entries(db.data.users).filter(([_, user]) => user.puntos > 0)
  users = users.sort((a, b) => b[1].puntos - a[1].puntos)
  let texto = '*Top 10 de mayor ganadas en el casino:*\n\n'
  for (let i = 0; i < 10 && i < users.length; i++) {
    let [nombre, user] = users[i]
    texto += `${i + 1}. @${nombre.split('@')[0]}: ${user.puntos} puntos\n`
  }
  m.reply(texto, null, { mentions: users.map(([nombre]) => nombre) })
}

handler.help = ['topcasino']
handler.tags = ['casino', 'juegos', 'diversión']
handler.command = ['topcasino']

export default handler