const { atan } = require('mathjs');
const PI = 3.14159;
const { tan } = require('mathjs');
var { games,getArray } = require("./array");
module.exports = {
	name: 'fov',
	description: 'Converts fovs from one type to another',
    args: true,
    usage: '<fov> <input fov ratio or game> <output fov ratio or game> \n(Supported ratios: 16:9, 4:3, 1:1) (Supported games: ' + games() + ')',
	execute(message, args) {
        function fovT(Args){
            if (Args=='1:1'){
                return 1;
            } else if (Args == '4:3'){
                return 0.75;
            } else if (Args == '16:9'){
                return 0.5625;
            } else {
                for (var i=0; i<getArray.length;i++){
                    if (Args == getArray[i].name) {
                        return getArray[i].fovt;
                    }
                }
            } 
        }
        var IFOVT = fovT(args[1]);
        var OFOVT = fovT(args[2]);
        var output = (atan(((IFOVT)/(OFOVT)) * tan(args[0] * PI/360)) * 360/PI).toFixed(5);
        message.reply(output + '°');
        },
    };