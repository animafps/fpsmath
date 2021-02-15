"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../../array");
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class getObjectCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "getobject",
            group: "util",
            memberName: "getobject",
            description: "Displays the object associated for a game",
            details: "Displays the object associated for a game \nTo see the Supported games use the `games` Command, (Supported Objects: fovt, yaw, name)",
            examples: ["getobject ow yaw"],
            format: '<game> <"yaw"|"name"|"fovt">',
            args: [
                {
                    key: "game",
                    prompt: "what game do you want to object the object for",
                    type: "gamename",
                },
                {
                    key: "object",
                    prompt: "what object do you want to get",
                    type: "string",
                },
            ],
        });
    }
    async run(message, args) {
        return message.reply(array_1.getObject(args.game, args.object));
    }
};
