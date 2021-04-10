import { getObject } from "../../array";
import { Argument, Command } from "discord-akairo";
import { Message } from "discord.js";

export default class degCommand extends Command {
  constructor() {
    super("deg", {
      aliases: ["deg/mm", "deg"],
      description:
        "Converts Sensitivity to deg/mm \nTo see the Supported games use the `games` Command",
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
          default: 5,
        },
      ],
    });
  }

  async run(
    message: Message,
    args: { cpi: number; yaw: any; sens: number; dp: number }
  ) {
    const output = (
      (args.cpi * parseFloat(getObject(args.yaw, "yaw")) * args.sens) /
      25.4
    ).toFixed(args.dp);
    return message.util?.reply(output + " deg/mm");
  }
}
