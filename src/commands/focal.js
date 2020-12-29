const PI = 3.14159;
const { tan } = require('mathjs');
module.exports = {
  name: 'focal',
  description: 'Focal Length Scales a desired sens between 2 fov values of the same type',
  args: true,
  usage: '<old sens> <old fov> <new fov>',
  execute(message, args) {
    var output = ((tan((args[2] * PI) / 360) / tan((args[1] * PI) / 360)) * args[0]).toFixed(5);
    message.reply(output);
  },
};
