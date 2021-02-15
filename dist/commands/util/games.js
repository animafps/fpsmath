"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../../array");
const discord_js_commando_1 = require("discord.js-commando");
const discord_js_1 = require("discord.js");
module.exports = class gamesCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "games",
            group: "util",
            memberName: "games",
            description: "Displays the supported games for this bot",
            examples: ["games"],
        });
    }
    async run(message) {
        const Embed = new discord_js_1.MessageEmbed().addField("Supported Games:", `\`\`\`${array_1.games()}\`\`\``);
        return message.say(Embed);
    }
};
