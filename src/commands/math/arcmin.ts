import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class arcminCommand extends Command {
  constructor() {
    super("arcmin", {
      aliases: ["arcmin", "minute-of-arc", "arcmin/inch", "minute-of-arc/inch"],
      description: {
        content: "Converts Sensitivity to arcmin(minute of arc per inch)",
        usage: "<sens> <game | yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["arcmin 4 r6 800", "arcmin 2 0.032 1600"],
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
          default: 5,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`arcmin\` command's accepted format is \`arcmin <sens> <game|yaw> <cpi>\`. Use \`help arcmin\` for more information`,
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
    const output = (args.cpi * yaw * args.sens * (1 / 60)).toFixed(args.dp);
    return message.reply(output + " arcmin");
  }
}
