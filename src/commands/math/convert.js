const { games, getObject } = require('../../array');
const commando = require('discord.js-commando');

module.exports = class convertCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'convert',
      group: 'math',
      memberName: 'convert',
      description: 'Converts Different Sensitivities from one game to another',
      details: `Converts Different Sensitivities from one game to another \n (Supported Games: ${games()})`,
      examples: ['`/convert 0.95 ow 0.022`'],

      args: [
        {
          key: 'sens',
          prompt: 'What Sensitivity do you want to convert from',
          type: 'float',
        },
        {
          key: 'ingame',
          label: 'input Game or yaw value',
          prompt: 'What game or yaw value do you want to use for input',
          type: 'gamename|float',
        },
        {
          key: 'outgame',
          label: 'output Game or yaw value',
          prompt: 'What game or yaw value do you want to use for output',
          type: 'gamename|float',
        },
      ],
    });
  }

  async run(message, args) {
    const output = (
      args.sens *
      (getObject(args.ingame, 'yaw') / getObject(args.outgame, 'yaw'))
    ).toFixed(5);
    return message.say(output);
  }
};
