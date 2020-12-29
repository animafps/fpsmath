var { games, getObject } = require('./array');
const commando = require('discord.js-commando');
module.exports = class cmCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'cm',
      aliases: ['cm/360', 'cm/rev'],
      group: 'math',
      memberName: 'cm',
      description: 'Converts Senstivity to cm/360',
      details: `Converts Senstivity to cm/360 \n (Supported Games: ${games()})`,
      examples: ['`/cm 0.95 ow 1600`'],

      args: [
        {
          key: 'sens',
          prompt: 'What Sensitivity do you want to convert from',
          type: 'float',
        },
        {
          key: 'yawv',
          label: 'Game or yaw value',
          prompt: 'What game or yaw value do you want to use',
          type: 'string|float',
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
    var output = ((2.54 * 360) / (args.cpi * yaw * args.sens)).toFixed(2);
    return message.reply(output + ' cm/360');
  }
};
