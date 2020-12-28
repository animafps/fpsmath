var array = require("./array");
var games = '';
for (var x=0; x < array.length-2; x++){
    games += array[x].name + ', ';
}
games += array[array.length-1].name;
module.exports = {
	name: 'convert',
	description: 'Converts Different Sensitivities from one game to another',
    args: true,
    usage: '<sensitivity value> <initial game or yaw value> <output game or yaw value> \n(Supported games: ' + games + ')',
	execute(message, args) {
        var sens = args[0];
        for (var i=0; i < array.length; i++){
            if (args[1] == array[i].name) {
                var inyaw = array[i].yaw;
            } else if (typeof(args[1] === 'number')){
                var inyaw = args[1];
            }
            if (args[2] == array[i].name){
                var outyaw = array[i].yaw;
            }
            else if (typeof(args[2] === 'number')){
                var outyaw = args[2];
            }
        }
        var output = (sens*(inyaw/outyaw)).toFixed(5);
        message.reply(output);
        },
    };