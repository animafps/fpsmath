const { getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class inchCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'inch',
      aliases: ['inch/360', 'inch/rev'],
      group: 'math',
      memberName: 'inch',
      description: 'Converts Senstivity to inch/360',
      details:
        'Converts Senstivity to inch/360 \nTo see the Supported games do /games',
      examples: ['`/inch 0.95 ow 1600`'],
      format: '<sens> <game|yaw> <cpi>',

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
    const output = (
      360 /
      (args.cpi * getObject(args.yawv, 'yaw') * args.sens)
    ).toFixed(2);
    return message.say(output + ' inch/360');
  }
};
