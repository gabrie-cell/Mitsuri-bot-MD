let handler = async (m, { conn, text }) => {
  let users = Object.keys(db.data.users)
  let user1 = m.sender
  let user2 = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.quoted ? m.quoted.sender : null
  if (!user2) return m.reply('Etiqueta a un usuario para desafiarlo a una pelea de Clash Royale!')
  if (user1 === user2) return m.reply('No puedes pelear contigo mismo!')

  let user1Data = db.data.users[user1]
  let user2Data = db.data.users[user2]
  if (!user1Data || !user2Data) return m.reply('Uno de los usuarios no tiene datos de Clash Royale!')

  let user1Tropas = user1Data.tropas || { 'Barbaro': 0, 'Arquero': 0, 'Gigante': 0, 'Goblin': 0, 'Esqueleto': 0 }
  let user2Tropas = user2Data.tropas || { 'Barbaro': 0, 'Arquero': 0, 'Gigante': 0, 'Goblin': 0, 'Esqueleto': 0 }

  let batalla = async () => {
    let turno = Math.random() < 0.5 ? user1 : user2
    let rival = turno === user1 ? user2 : user1
    let tropasTurno = turno === user1 ? user1Tropas : user2Tropas
    let tropasRival = rival === user1 ? user1Tropas : user2Tropas

    let texto = `¡Comienza la pelea entre @${user1.split('@')[0]} y @${user2.split('@')[0]}!\n\n`
    texto += `Tropas de @${user1.split('@')[0]}: ${Object.keys(user1Tropas).join(', ')}\n`
    texto += `Tropas de @${user2.split('@')[0]}: ${Object.keys(user2Tropas).join(', ')}\n\n`

    while (Object.values(tropasTurno).some(tropa => tropa > 0) && Object.values(tropasRival).some(tropa => tropa > 0)) {
      let tropaElegida = Object.keys(tropasTurno).find(tropa => tropasTurno[tropa] > 0)
      let tropaRival = Object.keys(tropasRival).find(tropa => tropasRival[tropa] > 0)

      texto += `Turno de @${turno.split('@')[0]}: ${tropaElegida} vs ${tropaRival} de @${rival.split('@')[0]}\n`

      let resultado = Math.random() < 0.5 ? turno : rival
      if (resultado === turno) {
        tropasRival[tropaRival]--
        texto += `¡${tropaElegida} de @${turno.split('@')[0]} gana!\n\n`
      } else {
        tropasTurno[tropaElegida]--
        texto += `¡${tropaRival} de @${rival.split('@')[0]} gana!\n\n`
      }

      turno = turno === user1 ? user2 : user1
      rival = rival === user1 ? user2 : user1
      tropasTurno = turno === user1 ? user1Tropas : user2Tropas
      tropasRival = rival === user1 ? user1Tropas : user2Tropas
    }

    let ganador = Object.values(tropasTurno).some(tropa => tropa > 0) ? turno : rival
    texto += `¡La pelea ha terminado! El ganador es @${ganador.split('@')[0]}!`

    m.reply(texto, null, { mentions: [user1, user2] })
  }

  batalla()
}

handler.help = ['pelea <@usuario>']
handler.tags = ['juegos', 'clashroyale']
handler.command = ['pelea']

export default handler