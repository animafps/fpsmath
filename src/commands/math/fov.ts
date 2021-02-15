import { atan, tan, pi } from "mathjs";
import { getObject } from "../../array";
import { Command, CommandoClient } from "discord.js-commando";
module.exports = class fovCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "fov",
      aliases: ["fov-convert"],
      group: "math",
      memberName: "fov",
      description: "Converts fovs from one type to another",
      details:
        "Converts fovs from one type to another or finds the true fov  for a resolution aspect ratio(if the game scales to maintain vFOV) \nTo see the Supported games use the `games` Command",
      examples: ["fov 90 quake 16:9"],
      format: "<fov> <input game|aspect ratio> <output game|aspect ratio>",

      args: [
        {
          key: "fov",
          prompt: "What fov value do you want to convert from",
          type: "float",
        },
        {
          key: "iFOVT",
          label: "Input Game or aspect ratio",
          prompt: "What Game or aspect ratio do you want to convert from",
          type: "gamename|ratio",
        },
        {
          key: "oFOVT",
          label: "Output Game or aspect ratio",
          prompt: "What Game or aspect ratio do you want to convert to",
          type: "gamename|ratio",
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
    message: { reply: (arg0: string) => any },
    args: { iFOVT: any; oFOVT: any; fov: number; dp?: number }
  ) {
    function getFOVT(Args: string) {
      if (isNaN(parseFloat(Args))) {
        return parseFloat(getObject(Args, "fovt"));
      } else {
        const ratio = Args.split(":");
        return parseFloat(ratio[1]) / parseFloat(ratio[0]);
      }
    }

    const output = (
      (atan(
        (getFOVT(args.iFOVT) / getFOVT(args.oFOVT)) * tan((args.fov * pi) / 360)
      ) *
        360) /
      pi
    ).toFixed(args.dp);
    return message.reply(output + "°");
  }
};
