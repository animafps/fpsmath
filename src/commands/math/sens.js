var { games, getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class sensCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'sens',
      aliases: ['sens-cm'],
      group: 'math',
      memberName: 'sens',
      description: 'Converts cm/360 to a game sensitivity',
      details: `Converts cm/360 to a game sensitivity \n(Supported Games: ${games()})`,
      examples: ['`/sens 28.5 quake 1600`'],

      args: [
        {
          key: 'cm',
          prompt: 'What cm/360 do you want to convert from',
          type: 'float',
        },
        {
          key: 'yawv',
          label: 'Game or yaw value',
          prompt: 'What game or yaw value do you want to use',
          type: 'gamename|float',
        },
        {
          key: 'cpi',
          label: 'cpi/dpi',
          prompt: 'What CPI/DPI do you want to use',
          type: 'float',
        },
      ],
    });
  }

  async run(message, args) {
    var yaw = getObject(args.yawv, 'yaw');
    var output = ((2.54 * 360) / (args.cpi * yaw * args.cm)).toFixed(2);
    return message.say(output);
  }
};
