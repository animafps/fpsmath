var array = require("./array");
var games = '';
for (var x=0; x < array.length-2; x++){
    games += array[x].name + ', ';
}
games += array[array.length-1].name;
module.exports = {
	name: 'sens',
	description: 'Converts cm/360 to a game sensitivity',
    args: true,
    usage: '<cm/360 value> <game> <cpi/dpi> \n(Supported games: ' + games + ')',
	execute(message, args) {
        for (var i=0; i < array.length; i++){
            if (args[1] == array[i].name) {
                var yaw = array[i].yaw;
            }else if (typeof(args[1] === 'number')){
                var yaw = args[1];
            }
        }
       
        var output = (( 2.54 * 360) / ( args[2] * yaw * args[0])).toFixed(5);
        message.reply(output);
        },
    };