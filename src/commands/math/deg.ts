import { getObject } from "../../array";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
module.exports = class degCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "deg",
      aliases: ["deg/mm"],
      group: "math",
      memberName: "deg",
      description: "Converts Sensitivity to deg/mm",
      details:
        "Converts Sensitivity to deg/mm \nTo see the Supported games use the `games` Command",
      examples: ["deg 0.95 ow 1600"],
      format: "<sens> <game|yaw> <cpi>",

      args: [
        {
          key: "sens",
          prompt: "What Sensitivity do you want to convert from",
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
    message: CommandoMessage,
    args: { cpi: number; yaw: any; sens: number; dp: number | undefined }
  ) {
    const output = (
      (args.cpi * parseFloat(getObject(args.yaw, "yaw")) * args.sens) /
      25.4
    ).toFixed(args.dp);
    return message.reply(output + " deg/mm");
  }
};
