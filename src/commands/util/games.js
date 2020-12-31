var { games } = require('../../array');
const commando = require('discord.js-commando');
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
    return message.say(`Suported Games: ${games()}`);
  }
};
