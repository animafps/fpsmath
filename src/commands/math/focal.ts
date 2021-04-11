import { tan, pi } from "mathjs";
import { Command } from "discord-akairo";
import { Message } from "discord.js";
export default class focalCommand extends Command {
  constructor() {
    super("focal", {
      aliases: ["focal", "focallengthscaling", "visomotor"],
      description: {
        content:
          "Focal Length Scales a desired sens between 2 fov values of the same type",
      },
      args: [
        {
          id: "sens",
          type: "number",
          prompt: true,
        },
        {
          id: "iFOV",
          type: "number",
          prompt: true,
        },
        {
          id: "oFOV",
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
          start: `Invalid command usage. The \`focal\` command's accepted format is \`focal <sens> <input game | yaw> <output game | yaw>\`. Use \`help focal\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }

  async exec(
    message: Message,
    args: { oFOV: number; iFOV: number; sens: number; dp: number }
  ): Promise<Message | unknown> {
    const output = (
      (tan((args.oFOV * pi) / 360) / tan((args.iFOV * pi) / 360)) *
      args.sens
    ).toFixed(args.dp);
    return message.util?.reply(output);
  }
}
