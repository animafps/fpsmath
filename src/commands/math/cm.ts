import { getObject } from "../../array";
import type { Message } from "discord.js";
import { Command } from "discord-akairo";

export default class CMCommand extends Command {
  constructor() {
    super("cm", {
      aliases: ["cm/rev", "cm/360", "cm"],
      description: {
        content: "Converts a sensitivity value to cm/rev (cm/360)",
        usage: "<sens> <game|yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["cm 1 0.0022 1600", "cm 6 ow 800"],
      },
      args: [
        {
          id: "sens",
          type: "number",
          prompt: true,
        },
        {
          id: "yaw",
          type: "string",
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
          default: 3,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`cm\` command's accepted format is \`cm <sens> <game|yaw> <cpi>\`. Use \`help cm\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }

  async exec(
    message: Message,
    args: { cpi: number; yaw: string; sens: number; dp: number }
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
    const output = (2.54 * 360) / (args.cpi * yaw * args.sens);
    return message.reply(output.toFixed(args.dp) + " cm/rev");
  }
}
