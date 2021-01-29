const { getObject } = require('../../array');
const commando = require('discord.js-commando');

module.exports = class convertCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'convert',
      group: 'math',
      memberName: 'convert',
      description: 'Converts Different Sensitivities from one game to another',
      details:
        'Converts Different Sensitivities from one game to another \nTo see the Supported games do /games)',
      examples: ['`/convert 0.95 ow 0.022`'],
      format: '<sens> <input game|yaw> <output game|yaw>',

      args: [
        {
          key: 'sens',
          prompt: 'What Sensitivity do you want to convert from',
          type: 'float',
        },
        {
          key: 'inGame',
          label: 'input Game or yaw value',
          prompt: 'What game or yaw value do you want to use for input',
          type: 'gamename|float',
        },
        {
          key: 'outGame',
          label: 'output Game or yaw value',
          prompt: 'What game or yaw value do you want to use for output',
          type: 'gamename|float',
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
      args.sens *
      (getObject(args.inGame, 'yaw') / getObject(args.outGame, 'yaw'))
    ).toFixed(args.dp);
    return message.reply(output);
  }
};
