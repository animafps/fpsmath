import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class cminfoCommand extends Command {
  constructor() {
    super("cminfo", {
      aliases: ["cm-info"],
      description: {
        content: "Displays an explaination for what cm/360 is",
        usage: "",
      },
    });
  }

  async exec(message: Message): Promise<Message | unknown> {
    return message.util?.send(
      "cm/360 or cm/rev is a universal metric used for describing mouse sensitivity across all games. The definition is: how much centimeters you need to move your mouse in order to perform a 360 degree turn in-game.\n\n To calculate yours use the `cm` command"
    );
  }
}
