import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class SensCommand extends Command {
  constructor() {
    super("sens", {
      aliases: ["sens-cm", "sens-deg", "sens-inch", "sens"],
      description: {
        content:
          "Converts cm/rev(default), deg/mm or inch/rev or mpi or arcmin to a game sensitivity",
        usage: "<cm/rev | deg/mm | inch/rev | mpi value> <game | yaw> <cpi>",
        flags: `"-cm" // if the input value's unit is cm/rev it is the default and optional
          "-deg" // if the input value's unit is deg/mm
          "-inch" // if the input value's unit is inch/rev
          "-mpi" // if the input value's unit is mpi
          "-arcmin" // if the input value's unit is arcmin`,
        examples: ["sens 28.5 quake 1600", "sens 1.2 bf 1600 -deg"],
      },
      args: [
        {
          id: "cm",
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
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`sens\` command's accepted format is \`sens <cm/rev | deg/mm | inch/rev | mpi > <game | yaw> <cpi>\`. Use \`help sens\` for more information`,
          time: 1,
          retries: 0,
        },
      },
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
      arcminflag?: boolean;
      dp: number;
    }
  ): Promise<Message> {
    let yaw: number;
    if (isNaN(Number(args.yaw))) {
      if (getObject(args.yaw, "yaw")) {
        yaw = Number(getObject(args.yaw, "yaw"));
      } else {
        return msg.reply(
          `\`${args.yaw}\` game not supported. To see the supported games use the \`games\` command`
        );
      }
    } else {
      yaw = Number(args.yaw);
    }

    if (args.degflag) {
      msg.reply(((args.cpi * yaw * 60) / args.cm).toFixed(args.dp));
    }

    if (args.mpiflag) {
      msg.reply(((24.5 * args.cm) / (args.cpi * yaw)).toFixed(args.dp));
    }

    if (args.inchflag) {
      return msg.reply((360 / (args.cpi * yaw * args.cm)).toFixed(args.dp));
    }

    if (args.cmflag) {
      return msg.reply(
        ((2.54 * 360) / (args.cpi * yaw * args.cm)).toFixed(args.dp)
      );
    }

    if (args.arcminflag) {
      return msg.reply(
        ((args.cpi * yaw * (1 / 60)) / args.cm).toFixed(args.dp)
      );
    }

    const output = ((2.54 * 360) / (args.cpi * yaw * args.cm)).toFixed(args.dp);
    return msg.reply(output);
  }
}
