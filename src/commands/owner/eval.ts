import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class EvalCommand extends Command {
  constructor() {
    super("eval", {
      aliases: ["eval"],
      args: [
        {
          id: "commandID",
        },
      ],
      ownerOnly: true,
    });
  }

  async exec(
    message: Message,
    args: { commandID: string }
  ): Promise<Message | undefined> {
    this.handler.reload(args.commandID);
    return message.util?.reply(`Reloaded command ${args.commandID}!`);
  }
}
