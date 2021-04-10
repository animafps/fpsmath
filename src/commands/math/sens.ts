import { getObject } from "../../array";
import { Argument, Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class sensCommand extends Command {
  constructor() {
    super("sens", {
      aliases: ["sens-cm", "sens-deg", "sens-inch", "sens"],
      description:
        "Converts cm/rev(default), deg/mm or inch/rev to a game sensitivity",
      args: [
        {
          id: "cm",
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
          id: "cmflag",
          match: "flag",
          flag: "-cm",
        },
        {
          id: "inchflag",
          match: "flag",
          flag: "-inch",
        },
        {
          id: "degflag",
          match: "flag",
          flag: "-deg",
        },
        {
          id: "mpiflag",
          match: "flag",
          flag: "-mpi",
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
    msg: Message,
    args: {
      cpi: number;
      yaw: string;
      cm: number;
      cmflag?: boolean;
      inchflag?: boolean;
      mpiflag?: boolean;
      degflag?: boolean;
      dp: number;
    }
  ) {
    if (args.degflag) {
      const output = (
        (args.cpi * parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) * 60) /
        args.cm
      ).toFixed(args.dp);
      return msg.util?.reply(output);
    }

    if (args.mpiflag) {
      const output = (
        (24.5 * args.cm) /
        (args.cpi * parseFloat(getObject(args.yaw.toLowerCase(), "yaw")))
      ).toFixed(args.dp);
      return msg.util?.reply(output);
    }

    if (args.inchflag) {
      const output = (
        360 /
        (args.cpi *
          parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
          args.cm)
      ).toFixed(args.dp);
      return msg.util?.reply(output);
    }

    if (args.cmflag) {
      const output = (
        (2.54 * 360) /
        (args.cpi *
          parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
          args.cm)
      ).toFixed(args.dp);
      return msg.util?.reply(output);
    }

    const output = (
      (2.54 * 360) /
      (args.cpi *
        parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
        args.cm)
    ).toFixed(args.dp);
    return msg.util?.reply(output);
  }
}
