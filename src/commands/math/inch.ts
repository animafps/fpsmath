import { getObject } from "../../array";
import { Argument, Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class inchCommand extends Command {
  constructor() {
    super("inch", {
      aliases: ["inch/rev", "inch/360", "inch"],
      description:
        "Converts Sensitivity to inch/rev \nTo see the Supported games use the `games` Command",
      args: [
        {
          id: "sens",
          type: "number",
        },
        {
          id: "yaw",
          type: Argument.union("game", "number"),
        },
        {
          id: "cpi",
          type: "number",
        },
        {
          id: "dp",
          type: "number",
          match: "option",
          flag: ["-dp", "dp:", "dp"],
          default: 2,
        },
      ],
    });
  }

  async exec(
    message: Message,
    args: { cpi: number; yaw: any; sens: number; dp: number | undefined }
  ) {
    const output = (
      360 /
      (args.cpi * parseFloat(getObject(args.yaw, "yaw")) * args.sens)
    ).toFixed(args.dp);
    return message.util?.reply(output + " inch/rev");
  }
}
