import { getObject } from "../../array";
import { Message } from "discord.js";
import { Command } from "discord-akairo";

export default class convertCommand extends Command {
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
      inGame: string | number;
      outGame: string | number;
      sens: number;
      dp: number;
    }
  ): Promise<Message> {
    const output = (
      (args.sens *
        (typeof args.inGame === "string"
          ? Number(getObject(args.inGame, "yaw"))
          : args.inGame)) /
      (typeof args.outGame === "string"
        ? Number(getObject(args.outGame, "yaw"))
        : args.outGame)
    ).toFixed(args.dp);
    return message.reply(output);
  }
}
