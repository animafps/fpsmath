var { games, getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class degCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'deg',
      aliases: ['deg/mm'],
      group: 'math',
      memberName: 'deg',
      description: 'Converts Senstivity to deg/mm',
      details: `Converts Senstivity to deg/mm \n (Supported Games: ${games()})`,
      examples: ['`/deg 0.95 ow 1600`'],

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
    var yaw = getObject(args.yawv, 'yaw');
    var output = ((args.cpi * yaw * args.sens) / 25.4).toFixed(2);
    return message.say(output + ' deg/mm');
  }
};
