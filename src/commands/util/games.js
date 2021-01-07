const { games } = require('../../array');
const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class gamesCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'games',
      group: 'util',
      memberName: 'games',
      description: 'Displays the supported games for this bot',
      examples: ['`/games`'],
    });
  }

  async run(message) {
    const Embed = new discord.MessageEmbed()
      .setColor('#0099ff')
      .addField('Supported Games:', `\`\`\`${games()}\`\`\``);
    return message.say(Embed);
  }
};
