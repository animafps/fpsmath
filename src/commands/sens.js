var { games, getObject } = require('./array');
module.exports = {
  name: 'sens',
  description: 'Converts cm/360 to a game sensitivity',
  args: true,
  usage: `<cm/360 value> <game or yaw> <cpi/dpi> \n(Supported games: ${games()})`,
  execute(message, args) {
    var yaw = getObject(args[1], 'yaw');

    var output = ((2.54 * 360) / (args[2] * yaw * args[0])).toFixed(5);
    message.reply(output);
  },
};
