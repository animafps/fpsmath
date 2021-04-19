import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class getObjectCommand extends Command {
  constructor() {
    super("getobject", {
      aliases: ["get-object"],
      description: {
        content:
          "Displays the object associated for a game \nTo see the Supported games use the `games` Command, (Supported Objects: fovt, yaw, aliases, afovt)",
        usage: '<game> <"fovt" | "yaw" | "afovt" | "aliases">',
        examples: ["getobject source afovt"],
      },
      args: [
        {
          id: "game",
        },
        {
          id: "object",
        },
      ],
    });
  }

  async exec(
    message: Message,
    args: { game: string; object: string }
  ): Promise<Message> {
    return message.reply(
      getObject(args.game, args.object)?.toString() ||
        "Object or Game not found"
    );
  }
}
