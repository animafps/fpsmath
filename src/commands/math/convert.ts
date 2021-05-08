import { getObject } from "../../array";
import { Message } from "discord.js";
import { Command } from "discord-akairo";

export default class ConvertCommand extends Command {
  constructor() {
    super("convert", {
      aliases: ["convert"],
      description: {
        content:
          "Converts different sensitivities from one game or yaw value to another",
        usage: "<input game | yaw> <output game | yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["convert 6 wz 0.022"],
      },
      args: [
        {
          id: "sens",
          type: "number",
          prompt: true,
        },
        {
          id: "inGame",
          type: "string",
          prompt: true,
        },
        {
          id: "outGame",
          type: "string",
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
          start: `Invalid command usage. The \`convert\` command's accepted format is \`convert <sens> <input game | yaw> <output game | yaw>\`. Use \`help convert\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }
  async exec(
    message: Message,
    args: {
      inGame: string;
      outGame: string;
      sens: number;
      dp: number;
    }
  ): Promise<Message> {
    let inYaw = 0;
    let outYaw = 0;
    if (isNaN(Number(args.inGame))) {
      if (getObject(args.inGame, "yaw")) {
        inYaw = Number(getObject(args.inGame, "yaw"));
      } else if (!getObject(args.inGame, "yaw")) {
        return message.reply(
          `\`${args.inGame}\` game not supported. To see the supported games use the \`games\` command`
        );
      }
    } else {
      inYaw = Number(args.inGame);
    }

    if (isNaN(Number(args.outGame))) {
      if (getObject(args.outGame, "yaw")) {
        outYaw = Number(getObject(args.outGame, "yaw"));
      } else if (!getObject(args.outGame, "yaw")) {
        return message.reply(
          `\`${args.outGame}\` game not supported. To see the supported games use the \`games\` command`
        );
      }
    } else {
      outYaw = Number(args.outGame);
    }

    return message.reply((args.sens * (inYaw / outYaw)).toFixed(args.dp));
  }
}
