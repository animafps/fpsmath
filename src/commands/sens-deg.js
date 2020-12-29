var { games, getObject } = require('./array');
module.exports = {
  name: 'sens-deg',
  description: 'Converts deg/mm to a game sensitivity',
  args: true,
  usage: '<deg/mm value> <game or yaw value> <cpi/dpi> \n(Supported games: ' + games() + ')',
  execute(message, args) {
    var yaw = getObject(args[1], 'yaw');
    var output = ((args[2] * yaw * args[0]) / 25.4).toFixed(5);
    message.reply(output);
  },
};
