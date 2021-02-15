"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
const array_1 = require("../../array");
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class fovCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "fov",
            aliases: ["fov-convert"],
            group: "math",
            memberName: "fov",
            description: "Converts fovs from one type to another",
            details: "Converts fovs from one type to another or finds the true fov  for a resolution aspect ratio(if the game scales to maintain vFOV) \nTo see the Supported games use the `games` Command",
            examples: ["fov 90 quake 16:9"],
            format: "<fov> <input game|aspect ratio> <output game|aspect ratio>",
            args: [
                {
                    key: "fov",
                    prompt: "What fov value do you want to convert from",
                    type: "float",
                },
                {
                    key: "iFOVT",
                    label: "Input Game or aspect ratio",
                    prompt: "What Game or aspect ratio do you want to convert from",
                    type: "gamename|ratio",
                },
                {
                    key: "oFOVT",
                    label: "Output Game or aspect ratio",
                    prompt: "What Game or aspect ratio do you want to convert to",
                    type: "gamename|ratio",
                },
                {
                    key: "dp",
                    label: "decimal places",
                    prompt: "How Many Decimal places",
                    type: "float",
                    default: "5",
                },
            ],
        });
    }
    async run(message, args) {
        function getFOVT(Args) {
            if (isNaN(parseFloat(Args))) {
                return parseFloat(array_1.getObject(Args, "fovt"));
            }
            else {
                const ratio = Args.split(":");
                return parseFloat(ratio[1]) / parseFloat(ratio[0]);
            }
        }
        const output = ((mathjs_1.atan((getFOVT(args.iFOVT) / getFOVT(args.oFOVT)) * mathjs_1.tan((args.fov * mathjs_1.pi) / 360)) *
            360) /
            mathjs_1.pi).toFixed(args.dp);
        return message.reply(output + "°");
    }
};
