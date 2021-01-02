const { getObject, games } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class getObjectCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'getobject',
      group: 'util',
      memberName: 'getobject',
      description: 'Displays the object assoiated for a game',
      details: `Displays the object assoiated for a game \n(Supported games: ${games()}), (Supported Objects: fovt, yaw)`,
      examples: ['`/getobject ow yaw`'],
      args: [
        {
          key: 'game',
          prompt: 'what game do you want to object the object for',
          type: 'gamename',
        },
        {
          key: 'object',
          prompt: 'what object do you want to get',
          type: 'string',
        },
      ],
    });
  }

  async run(message, args) {
    return message.say(getObject(args.game, args.object));
  }
};
