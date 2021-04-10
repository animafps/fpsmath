import { getObject } from "../../array";
import { Argument, Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class MPICommand extends Command {
  constructor() {
    super("mpi", {
      aliases: ["mpi", "arcmin", "arc/inch", "arcmin/inch"],
      description: "Converts Sensitivity to MPI(minute of arc per inch)",
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
          default: 3,
        },
      ],
    });
  }

  async exec(
    message: Message,
    args: { cpi: number; yaw: any; sens: number; dp: number }
  ) {
    const output = (
      args.cpi *
      parseFloat(getObject(args.yaw, "yaw")) *
      args.sens *
      60
    ).toFixed(args.dp);
    return message.util?.reply(output + " MPI");
  }
}
