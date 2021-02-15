import { getObject } from "../../array";
import { Command, CommandoClient } from "discord.js-commando";
module.exports = class getObjectCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "getobject",
      group: "util",
      memberName: "getobject",
      description: "Displays the object associated for a game",
      details:
        "Displays the object associated for a game \nTo see the Supported games use the `games` Command, (Supported Objects: fovt, yaw, name)",
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

  async run(
    message: { reply: (arg0: any) => any },
    args: { game: any; object: any }
  ) {
    return message.reply(getObject(args.game, args.object));
  }
};
