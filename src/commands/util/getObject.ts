import { getObject } from "../../array";
import { Command, Argument } from "discord-akairo";
import type { Message } from "discord.js";

export default class getObjectCommand extends Command {
  constructor() {
    super("getobject", {
      aliases: ["getobject"],
      description:
        "Displays the object associated for a game \nTo see the Supported games use the `games` Command, (Supported Objects: fovt, yaw, name)",
      args: [
        {
          id: "game",
          type: "game",
        },
        {
          id: "object",
          type: Argument.validate("string", (m, p) =>
            ["fovt", "yaw", "name", "afovt"].includes(p)
          ),
        },
      ],
    });
  }

  async exec(message: Message, args: { game: string; object: string }) {
    return message.util?.reply(getObject(args.game, args.object));
  }
}
