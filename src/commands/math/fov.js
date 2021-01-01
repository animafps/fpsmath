const { atan, tan } = require('mathjs');
const PI = 3.14159;
var { games, getObject } = require('../../array');
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
          type: 'gamename|string',
        },
        {
          key: 'ofovt',
          label: 'Output Game or aspect ratio',
          prompt: 'What Game or aspect ratio do you want to convert to',
          type: 'gamename|string',
        },
      ],
    });
  }

  async run(message, args) {
    function getFOVT(args) {
      if (isNaN(parseFloat(args))) {
        return getObject(args, 'fovt');
      } else {
        var ratio = args.split(':');
        return ratio[1] / ratio[0];
      }
    }

    var output = (
      (atan(
        (getFOVT(args.ifovt) / getFOVT(args.ofovt)) * tan((args.fov * PI) / 360)
      ) *
        360) /
      PI
    ).toFixed(5);
    return message.say(output + '°');
  }
};
