const { atan } = require('mathjs');
const PI = 3.14159;
const { tan } = require('mathjs');
var { games,getObject } = require("./array");
module.exports = {
	name: 'fov',
	description: 'Converts fovs from one type to another',
    args: true,
    usage: '<fov> <input fov ratio or game> <output fov ratio or game> \n(Supported ratios: 16:9, 4:3, 1:1) (Supported games: ' + games() + ')',
	execute(message, args) {
        function FOVT(argS){
            if (argS=='1:1'){
                return 1;
            } else if (argS == '4:3'){
                return 0.75;
            } else if (argS == '16:9'){
                return 0.5625;
            } else {
                return getObject(argS, 'fovt');
            } 
        }
        var IFOVT = FOVT(args[1]);
        var OFOVT = FOVT(args[2]);
        var output = (atan(((IFOVT)/(OFOVT)) * tan(args[0] * PI/360)) * 360/PI).toFixed(5);
        message.reply(output + '°');
        },
    };