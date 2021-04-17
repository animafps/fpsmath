import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class inchCommand extends Command {
  constructor() {
    super("inch", {
      aliases: ["inch/rev", "inch/360", "inch"],
      description: {
        content: "Converts Sensitivity to inch/rev",
        usage: "<sens> <game|yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["inch 3 ow 1600", "inch 2 0.022 800"],
      },
      args: [
        {
          id: "sens",
          type: "number",
          prompt: true,
        },
        {
          id: "yaw",
          prompt: true,
        },
        {
          id: "cpi",
          type: "number",
          prompt: true,
        },
        {
          id: "dp",
          type: "number",
          match: "option",
          flag: ["-dp", "dp:", "dp"],
          default: 2,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`inch\` command's accepted format is \`inch <sens> <game|yaw> <cpi>\`. Use \`help inch\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }

  async exec(
    message: Message,
    args: { cpi: number; yaw: string; sens: number; dp: number | undefined }
  ): Promise<Message> {
    let yaw: number;
    if (isNaN(Number(args.yaw))) {
      if (getObject(args.yaw, "yaw")) {
        yaw = Number(getObject(args.yaw, "yaw"));
      } else {
        return message.reply(
          `\`${args.yaw}\` game not supported. To see the supported games use the \`games\` command`
        );
      }
    } else {
      yaw = Number(args.yaw);
    }

    const output = (360 / (args.cpi * yaw * args.sens)).toFixed(args.dp);
    return message.reply(output + " inch/rev");
  }
}
