import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class AddCommand extends Command {
  constructor() {
    super("add", {
      aliases: ["add"],
      args: [
        {
          id: "numOne",
          type: "number",
          prompt: true,
        },
        {
          id: "numTwo",
          type: "number",
          prompt: true,
        },
        {
          id: "numThree",
          type: "number",
          prompt: true,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: "Please input a number!",
          retry: "Please input a number!",
        },
      },
    });
  }

  exec(
    message: Message,
    args: { numOne: number; numTwo: number; numThree: number }
  ) {
    const sum = args.numOne + args.numTwo + args.numThree;
    return message.reply(`The sum is ${sum}!`);
  }
}
