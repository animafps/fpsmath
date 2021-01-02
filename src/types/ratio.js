const commando = require('discord.js-commando');

class RatioArgumentType extends commando.ArgumentType {
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
