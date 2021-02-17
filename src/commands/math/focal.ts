import { tan, pi } from "mathjs";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
module.exports = class focalCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "focal",
      group: "math",
      memberName: "focal",
      description:
        "Focal Length Scales a desired sens between 2 fov values of the same type",
      examples: ["focal 0.95 90 100"],
      format: "<sens> <old fov> <new fov>",

      args: [
        {
          key: "sens",
          prompt: "What Sensitivity do you want to convert from",
          type: "float",
        },
        {
          key: "iFOV",
          label: "old fov",
          prompt: "What is the old FOV value",
          type: "float",
        },
        {
          key: "oFOV",
          label: "new fov",
          prompt: "What is the new FOV value",
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
    args: { oFOV: number; iFOV: number; sens: number; dp?: number }
  ) {
    const output = (
      (tan((args.oFOV * pi) / 360) / tan((args.iFOV * pi) / 360)) *
      args.sens
    ).toFixed(args.dp);
    return message.reply(output);
  }
};
