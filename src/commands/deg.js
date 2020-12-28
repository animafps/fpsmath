var array = require("./array");
var games = '';
for (var x=0; x < array.length-2; x++){
    games += array[x].name + ', ';
}
games += array[array.length-1].name;
module.exports = {
	name: 'deg',
	description: 'Converts Senstivity to deg/mm',
    args: true,
    usage: '<sensitivity value> <game or yaw value> <cpi/dpi> \n(Supported games: ' + games + ')',
	execute(message, args) {
        var sens = args[0];
        for (var i=0; i < array.length; i++){
            if (args[1] == array[i].name) {
                var yaw = array[i].yaw;
            } else if (typeof(args[1] == 'number')){
                var yaw = args[1];
            }
        }
        var output = (( args[2] * yaw * sens)/ 25.4).toFixed(5);
        message.reply(output + ' deg/mm');
        },
    };