import { tan, pi } from "mathjs";
import { Command } from "discord-akairo";
import { Message } from "discord.js";
export default class focalCommand extends Command {
  constructor() {
    super("focal", {
      aliases: ["focal", "focallengthscaling", "visomotor"],
      description:
        "Focal Length Scales a desired sens between 2 fov values of the same type",
      args: [
        {
          id: "sens",
          type: "number",
        },
        {
          id: "iFOV",
          type: "number",
        },
        {
          id: "oFOV",
          type: "number",
        },
        {
          id: "dp",
          type: "number",
          match: "option",
          flag: ["-dp", "dp:", "dp"],
          default: 5,
        },
      ],
    });
  }

  async exec(
    message: Message,
    args: { oFOV: number; iFOV: number; sens: number; dp: number }
  ) {
    const output = (
      (tan((args.oFOV * pi) / 360) / tan((args.iFOV * pi) / 360)) *
      args.sens
    ).toFixed(args.dp);
    return message.util?.reply(output);
  }
}
