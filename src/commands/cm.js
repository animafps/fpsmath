var { games, getObject } = require('./array');
module.exports = {
  name: 'cm',
  description: 'Converts Senstivity to cm/360',
  args: true,
  usage: '<sensitivity value> <game or yaw value> <cpi/dpi> \n(Supported games: ' + games() + ')',
  execute(message, args) {
    var yaw = getObject(args[1], 'yaw');
    var output = ((2.54 * 360) / (args[2] * yaw * args[0])).toFixed(2);
    message.reply(output + ' cm/360');
  },
};
