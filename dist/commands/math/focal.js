"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class focalCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "focal",
            group: "math",
            memberName: "focal",
            description: "Focal Length Scales a desired sens between 2 fov values of the same type",
            examples: ["focal 0.95 90 100"],
            format: "<sens> <old fov> <new fov>",
            args: [
                {
                    key: "sens",
                    prompt: "What Sensitivity do you want to convert from",
                    type: "float",
                },
                {
                    key: "iFOV",
                    label: "old fov",
                    prompt: "What is the old FOV value",
                    type: "float",
                },
                {
                    key: "oFOV",
                    label: "new fov",
                    prompt: "What is the new FOV value",
                    type: "float",
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
        const output = ((mathjs_1.tan((args.oFOV * mathjs_1.pi) / 360) / mathjs_1.tan((args.iFOV * mathjs_1.pi) / 360)) *
            args.sens).toFixed(args.dp);
        return message.reply(output);
    }
};
