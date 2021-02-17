import { getObject } from "../../array";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

module.exports = class convertCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "convert",
      group: "math",
      memberName: "convert",
      description: "Converts Different Sensitivities from one game to another",
      details:
        "Converts Different Sensitivities from one game to another \nTo see the Supported games use the `games` Command",
      examples: ["convert 0.95 ow 0.022"],
      format: "<sens> <input game|yaw> <output game|yaw>",

      args: [
        {
          key: "sens",
          prompt: "What Sensitivity do you want to convert from",
          type: "float",
        },
        {
          key: "inGame",
          label: "input Game or yaw value",
          prompt: "What game or yaw value do you want to use for input",
          type: "gamename|float",
        },
        {
          key: "outGame",
          label: "output Game or yaw value",
          prompt: "What game or yaw value do you want to use for output",
          type: "gamename|float",
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
    args: { sens: number; inGame: any; outGame: any; dp: number | undefined }
  ) {
    const output = (
      args.sens *
      (parseFloat(getObject(args.inGame, "yaw")) /
        parseFloat(getObject(args.outGame, "yaw")))
    ).toFixed(args.dp);
    return message.reply(output);
  }
};
