import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class MPICommand extends Command {
  constructor() {
    super("mpi", {
      aliases: ["mpi", "milliradian", "mrad/inch", "milliradian/inch"],
      description: {
        content: "Converts Sensitivity to MPI(milliradian per inch)",
        usage: "<sens> <game|yaw> <cpi>",
        flags: "-dp <output decimal places>",
        examples: ["mpi 3 ow 1600", "mpi 2 0.022 800"],
      },
      args: [
        {
          id: "sens",
          type: "number",
          prompt: true,
        },
        {
          id: "yaw",
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
          start: `Invalid command usage. The \`mpi\` command's accepted format is \`cpi <sens> <game|yaw> <cpi>\`. Use \`help cpi\` for more information`,
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

    const output = (args.cpi * yaw * args.sens * 60).toFixed(args.dp);
    return message.reply(output + " MPI");
  }
}
