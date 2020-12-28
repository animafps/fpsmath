const { atan } = require('mathjs');
const PI = 3.14159;
const { tan } = require('mathjs');
var array = require("./array");
var games = '';
for (var x=0; x < array.length-2; x++){
    games += array[x].name + ', ';
}
games += array[array.length-1].name;
module.exports = {
	name: 'fov',
	description: 'Converts fovs from one type to another',
    args: true,
    usage: '<fov> <input fov ratio or game> <output fov ratio or game> \n(Supported ratios: 16:9, 4:3, 1:1) (Supported games: ' + games + ')',
	execute(message, args) {
        if (args[1]=='1:1'){
            var IFOVT = 1;
        } else if (args[1] == '4:3'){
            var IFOVT = 0.75;
        } else if (args[1] == '16:9'){
            var IFOVT = 0.5625;
        } else {
            for (var i=0; i<array.length;i++){
                if (args[1] == array[i].name) {
                    var IFOVT = array[i].fovt;
                }
            }
        }
        if (args[2]=='1:1'){
            var OFOVT = 1;
        } else if (args[2] == '4:3'){
            var OFOVT = 0.75;
        } else if (args[2] == '16:9'){
            var OFOVT = 0.5625;
        } else {
            for (var i=0; i<array.length;i++){
                if (args[2] == array[i].name) {
                    var OFOVT = array[i].fovt;
                }
            }
        }
        var output = (atan(((IFOVT)/(OFOVT)) * tan(args[0] * PI/360)) * 360/PI).toFixed(5);
        message.reply(output + '°');
        },
    };