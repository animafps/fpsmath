const { getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class cmCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'cm',
      aliases: ['cm/360', 'cm/rev'],
      group: 'math',
      memberName: 'cm',
      description: 'Converts Sensitivity to cm/360',
      details:
        'Converts Sensitivity to cm/360 \nTo see the Supported games do /games)',
      examples: ['`/cm 0.23327 val 1600`'],
      format: '<sens> <game|yaw> <cpi>',

      args: [
        {
          key: 'sens',
          prompt: 'What Sensitivity do you want to convert from',
          type: 'float',
        },
        {
          key: 'yaw',
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
        {
          key: 'dp',
          label: 'decimal places',
          prompt: 'How Many Decimal places',
          type: 'float',
          default: '2',
        },
      ],
    });
  }

  async run(message, args) {
    const output = (
      (2.54 * 360) /
      (args.cpi * getObject(args.yaw, 'yaw') * args.sens)
    ).toFixed(args.dp);
    return message.say(output + ' cm/360');
  }
};
