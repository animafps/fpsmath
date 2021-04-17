import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { getObject } from "../../array";

export default class FOVConvertCommand extends Command {
  constructor() {
    super("fovconvert", {
      aliases: ["fov-convert", "film-convert"],
      description: {
        content: "",
      },
      args: [
        {
          id: "fov",
          type: "number",
        },
        {
          id: "inFOVT",
        },
        {
          id: "outFOVT",
        },
      ],
    });
  }
  async exec(
    message: Message,
    args: { fov: number; inFOVT: string; outFOVT: string;}
  ): Promise<Message | undefined> {

    if (!getObject(args.inFOVT, "afovt") || !getObject(args.outFOVT, "afovt")){
      if (!/^\d{1,2}m[lfi]\d{1,2}$/gi.test(args.fovt) && !/^[hv]m[lif]/gi.test(args.fovt)) {
        return message.util?.reply(`${args.fovt} not supported. To see the supported game us the \`games\` command`)
      }
      return message.util?.reply(`Incorrect FILM Notation. To learn about Film notation read this: https://www.kovaak.com/film-notation/`)
    }

    return message.util?.reply();
  }
}
