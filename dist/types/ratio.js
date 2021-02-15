"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
class RatioArgumentType extends discord_js_commando_1.ArgumentType {
    constructor(client) {
        super(client, 'ratio');
    }
    validate(val) {
        return /^\d{1,2}:\d{1,2}$/.test(val);
    }
    parse(val) {
        return val;
    }
}
module.exports = RatioArgumentType;
