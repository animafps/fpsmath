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
      description: 'Converts fovs from one type to another',
      details: `Converts fovs from one type to another \n (Supported ratios: 16:9, 4:3, 1:1) (Supported Games: ${games()})`,
      examples: ['`/fov 90 quake 16:9`'],

      args: [
        {
          key: 'fov',
          prompt: 'What fov value do you want to convert from',
          type: 'float',
        },
        {
          key: 'ifovt',
          label: 'Input Game or FOV ratio',
          prompt: 'What Game or FOV ratio do you want to convert from',
          type: 'gamename|float',
        },
        {
          key: 'ofovt',
          label: 'Output Game or FOV ratio',
          prompt: 'What Game or FOV ratio do you want to convert to',
          type: 'gamename|float',
        },
      ],
    });
  }

  async run(message, args) {
    function FOVT(argS) {
      if (argS == '1:1') {
        return 1;
      } else if (argS == '4:3') {
        return 0.75;
      } else if (argS == '16:9') {
        return 0.5625;
      } else {
        return getObject(argS, 'fovt');
      }
    }
    var IFOVT = FOVT(args.ifovt);
    var OFOVT = FOVT(args.ofovt);
    var output = (
      (atan((IFOVT / OFOVT) * tan((args.fov * PI) / 360)) * 360) /
      PI
    ).toFixed(5);
    return message.reply(output + '°');
  }
};
