const commando = require('discord.js-commando');
const { getObject } = require('../array');

class GameNameArgumentType extends commando.ArgumentType {
  constructor(client) {
    super(client, 'gamename');
  }

  validate(val) {
    var game = getObject(val, 'yaw');
    return val.toLowerCase() !== game;
  }

  parse(val) {
    return val;
  }
}

module.exports = GameNameArgumentType;
