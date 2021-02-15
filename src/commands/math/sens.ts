import { getObject } from "../../array";
import { Command, CommandoClient } from "discord.js-commando";

module.exports = class sens extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "sens",
      aliases: ["sens-cm", "sens-deg", "sens-inch"],
      group: "math",
      memberName: "sens",
      description:
        "Converts cm/360(default), deg/mm or inch/360 to a game sensitivity",
      details:
        "Converts cm/360(default), deg/mm or inch/360 to a game sensitivity \nTo see the Supported games use the `games` Command",
      examples: [
        "sens 28.5 quake 1600",
        "sens 28.5 ow 1600 -cm",
        "sens 1.21 cs 1600 -deg",
        "sens 11.22 fortnite 1600 -inch",
      ],
      format:
        '<cm/360|deg/mm|inch/360> <game|yaw> <cpi> ["-cm"|"-deg"|"-inch"]',

      args: [
        {
          key: "cm",
          prompt: "What cm/360 do you want to convert from",
          type: "float",
        },
        {
          key: "yaw",
          label: "Game or yaw value",
          prompt: "What game or yaw value do you want to use",
          type: "gamename|float",
        },
        {
          key: "cpi",
          label: "cpi/dpi",
          prompt: "What CPI/DPI do you want to use",
          type: "float",
        },
        {
          key: "flags",
          prompt: "",
          default: "-cm",
          type: "string",
        },
        {
          key: "dp",
          label: "decimal places",
          prompt: "How Many Decimal places",
          type: "float",
          default: "5",
        },
      ],
    });
  }
  async run(
    msg: { reply: (arg0: string) => void },
    args: {
      flags: any;
      cpi: number;
      yaw: string;
      cm: number;
      dp: number | undefined;
    }
  ): Promise<any> {
    switch (args.flags) {
      case "-deg": {
        const output = (
          (args.cpi *
            parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
            60) /
          args.cm
        ).toFixed(args.dp);
        msg.reply(output);
        break;
      }

      case "-MPI": {
        const output = (
          (24.5 * args.cm) /
          (args.cpi * parseFloat(getObject(args.yaw.toLowerCase(), "yaw")))
        ).toFixed(args.dp);
        msg.reply(output);
        break;
      }

      case "-inch": {
        const output = (
          360 /
          (args.cpi *
            parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
            args.cm)
        ).toFixed(args.dp);
        msg.reply(output);
        break;
      }

      case "-cm": {
        const output = (
          (2.54 * 360) /
          (args.cpi *
            parseFloat(getObject(args.yaw.toLowerCase(), "yaw")) *
            args.cm)
        ).toFixed(args.dp);
        msg.reply(output);
      }
    }
  }
};
