var { games, getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class sensdegCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'sens-deg',
      group: 'math',
      memberName: 'sens-deg',
      description: 'Converts deg/mm to a game sensitivity',
      details: `Converts deg/mm to a game sensitivity \n(Supported Games: ${games()})`,
      examples: ['`/sens-deg 1.25 quake 1600`'],

      args: [
        {
          key: 'deg',
          prompt: 'What deg/mm do you want to convert from',
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
    var output = ((args.cpi * yaw * args.deg) / 25.4).toFixed(2);
    return message.reply(output);
  }
};
