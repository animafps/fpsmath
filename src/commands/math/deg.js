const { getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class degCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'deg',
      aliases: ['deg/mm'],
      group: 'math',
      memberName: 'deg',
      description: 'Converts Sensitivity to deg/mm',
      details:
        'Converts Sensitivity to deg/mm \nTo see the Supported games do /games)',
      examples: ['`/deg 0.95 ow 1600`'],
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
          default: '5',
        },
      ],
    });
  }

  async run(message, args) {
    const output = (
      (args.cpi * getObject(args.yaw, 'yaw') * args.sens) /
      25.4
    ).toFixed(args.dp);
    return message.reply(output + ' deg/mm');
  }
};
