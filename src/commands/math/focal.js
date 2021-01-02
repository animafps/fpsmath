const PI = 3.14159;
const { tan } = require('mathjs');

const commando = require('discord.js-commando');
module.exports = class focalCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'focal',
      group: 'math',
      memberName: 'focal',
      description:
        'Focal Length Scales a desired sens between 2 fov values of the same type',
      examples: ['`/focal 0.95 90 100`'],

      args: [
        {
          key: 'sens',
          prompt: 'What Sensitivity do you want to convert from',
          type: 'float',
        },
        {
          key: 'ifov',
          label: 'old fov',
          prompt: 'What is the old FOV value',
          type: 'float',
        },
        {
          key: 'ofov',
          label: 'new fov',
          prompt: 'What is the new FOV value',
          type: 'float',
        },
      ],
    });
  }

  async run(message, args) {
    const output = (
      (tan((args.ofov * PI) / 360) / tan((args.ifov * PI) / 360)) *
      args.sens
    ).toFixed(5);
    return message.say(output + ' deg/mm');
  }
};
