var { games,getYaw } = require("./array");
module.exports = {
	name: 'convert',
	description: 'Converts Different Sensitivities from one game to another',
    args: true,
    usage: '<sensitivity value> <initial game or yaw value> <output game or yaw value> \n(Supported games: ' + games() + ')',
	execute(message, args) {
        var inyaw = getYaw(args[1]);
        var outyaw = getYaw(args[2]);
        var output = (args[0]*(inyaw/outyaw)).toFixed(5);
        message.reply(output);
        },
    };