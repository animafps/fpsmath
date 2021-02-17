import { ArgumentType, CommandoClient } from "discord.js-commando";

class RatioArgumentType extends ArgumentType {
  constructor(client: CommandoClient) {
    super(client, "ratio");
  }

  validate(val: string) {
    return /^\d{1,2}:\d{1,2}$/.test(val);
  }

  parse(val: any) {
    return val;
  }
}

module.exports = RatioArgumentType;
