"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const array_1 = require("../array");
class GameNameArgumentType extends discord_js_commando_1.ArgumentType {
    constructor(client) {
        super(client, 'gamename');
    }
    validate(val) {
        return val.toLowerCase() !== array_1.getObject(val, 'yaw');
    }
    parse(val) {
        return val;
    }
}
module.exports = GameNameArgumentType;
