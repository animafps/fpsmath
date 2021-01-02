const commando = require('discord.js-commando');
const { getObject } = require('../array');

class GameNameArgumentType extends commando.ArgumentType {
  constructor(client) {
    super(client, 'gamename');
  }

  validate(val) {
    return val.toLowerCase() !== getObject(val, 'yaw');
  }

  parse(val) {
    return val;
  }
}

module.exports = GameNameArgumentType;
