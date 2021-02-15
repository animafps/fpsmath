"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../../array");
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class inchCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "inch",
            aliases: ["inch/360", "inch/rev"],
            group: "math",
            memberName: "inch",
            description: "Converts Sensitivity to inch/360",
            details: "Converts Sensitivity to inch/360 \nTo see the Supported games use the `games` Command",
            examples: ["inch 0.95 ow 1600"],
            format: "<sens> <game|yaw> <cpi>",
            args: [
                {
                    key: "sens",
                    prompt: "What Sensitivity do you want to convert from",
                    type: "float",
                },
                {
                    key: "yaw",
                    label: "Game or yaw value",
                    prompt: "What game or yaw value do you want to use",
                    type: "gamename|float",
                },
                {
                    key: "cpi",
                    label: "cpi/dpi",
                    prompt: "What CPI/DPI do you want to use",
                    type: "float",
                },
                {
                    key: "dp",
                    label: "decimal places",
                    prompt: "How Many Decimal places",
                    type: "float",
                    default: "2",
                },
            ],
        });
    }
    async run(message, args) {
        const output = (360 /
            (args.cpi * parseFloat(array_1.getObject(args.yaw, "yaw")) * args.sens)).toFixed(args.dp);
        return message.reply(output + " inch/360");
    }
};
