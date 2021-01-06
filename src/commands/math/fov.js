const { atan, tan } = require('mathjs');
const PI = 3.14159;
const { games, getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class fovCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'fov',
      aliases: ['fov-convert'],
      group: 'math',
      memberName: 'fov',
      description:
        'Converts fovs from one type to another or finds the true fov for a resolution aspect ratio',
      details: `Converts fovs from one type to another or finds the true fov  for a resolution aspect ratio(if the game scales to maintain vFOV) \n(Supported Games: ${games()})`,
      examples: ['`/fov 90 quake 16:9`'],
      format: '<fov> <input game|aspect ratio> <output game|aspect ratio>',

      args: [
        {
          key: 'fov',
          prompt: 'What fov value do you want to convert from',
          type: 'float',
        },
        {
          key: 'ifovt',
          label: 'Input Game or aspect ratio',
          prompt: 'What Game or aspect ratio do you want to convert from',
          type: 'gamename|ratio',
        },
        {
          key: 'ofovt',
          label: 'Output Game or aspect ratio',
          prompt: 'What Game or aspect ratio do you want to convert to',
          type: 'gamename|ratio',
        },
      ],
    });
  }

  async run(message, args) {
    function getFOVT(Args) {
      if (isNaN(parseFloat(Args))) {
        return getObject(Args, 'fovt');
      } else {
        const ratio = Args.split(':');
        return ratio[1] / ratio[0];
      }
    }

    const output = (
      (atan(
        (getFOVT(args.ifovt) / getFOVT(args.ofovt)) * tan((args.fov * PI) / 360)
      ) *
        360) /
      PI
    ).toFixed(5);
    return message.say(output + '°');
  }
};
