const commando = require('discord.js-commando');
const { getFOVT } = require('../array');

class FOVTArgumentType extends commando.ArgumentType {
  constructor(client) {
    super(client, 'fovt');
  }

  validate(val) {
    return val.toLowerCase() !== getFOVT(val);
  }

  parse(val) {
    return val;
  }
}

module.exports = FOVTArgumentType;
