import { getObject } from "../../array";
import { Message } from "discord.js";
import { Argument, Command } from "discord-akairo";

export default class convertCommand extends Command {
  constructor() {
    super("convert", {
      aliases: ["convert"],
      args: [
        {
          id: "sens",
          type: "number",
        },
        {
          id: "inGame",
          type: Argument.union("game", "number"),
        },
        {
          id: "outGame",
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
          default: 3,
        },
      ],
      description:
        "Converts Different Sensitivities from one game to another \nTo see the Supported games use the `games` Command",
    });
  }
  async exec(
    message: Message,
    args: {
      cpi: number;
      inGame: string;
      outGame: string;
      sens: number;
      dp: number;
    }
  ) {
    const output = (
      args.sens *
      (parseFloat(getObject(args.inGame, "yaw")) /
        parseFloat(getObject(args.outGame, "yaw")))
    ).toFixed(args.dp);
    return message.util?.reply(output);
  }
}
