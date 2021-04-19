import { getObject } from "../../array";
import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class degCommand extends Command {
  constructor() {
    super("deg", {
      aliases: ["deg/mm", "deg"],
      description: {
        content: "Converts Sensitivity to deg/mm",
        usage: "<sens> <game|yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["deg 3 ow 1600", "deg 2 0.022 800"],
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
          default: 5,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`deg\` command's accepted format is \`deg <sens> <game|yaw> <cpi>\`. Use \`help deg\` for more information`,
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
    const output = ((args.cpi * yaw * args.sens) / 25.4).toFixed(args.dp);
    return message.reply(output + " deg/mm");
  }
}
