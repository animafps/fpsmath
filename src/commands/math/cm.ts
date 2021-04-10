import { getObject } from "../../array";
import type { Message } from "discord.js";
import { Argument, ArgumentPromptData, Command } from "discord-akairo";

export default class cmCommand extends Command {
  constructor() {
    super("cm", {
      aliases: ["cm/rev", "cm/360", "cm"],
      description: {
        content: "Converts a sensitvitiy value to cm/rev[olution] (cm/360)",
        usage: "<sens> <game|yaw> <cpi> [-dp {decimal point}]",
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
          type: Argument.union("game", "number"),
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
  ) {
    const output =
      (2.54 * 360) /
      (args.cpi * parseFloat(getObject(args.yaw, "yaw")) * args.sens);
    return message.util?.reply(output.toFixed(args.dp) + " cm/rev");
  }
}
