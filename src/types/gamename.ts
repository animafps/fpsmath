import { ArgumentType, CommandoClient } from "discord.js-commando";
import { getObject } from "../array";

class GameNameArgumentType extends ArgumentType {
  constructor(client: CommandoClient) {
    super(client, "gamename");
  }

  validate(val: string) {
    return val.toLowerCase() !== getObject(val, "yaw");
  }

  parse(val: any) {
    return val;
  }
}

module.exports = GameNameArgumentType;
