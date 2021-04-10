import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class ReloadCommand extends Command {
  constructor() {
    super("reload", {
      aliases: ["reload"],
      args: [
        {
          id: "commandID",
        },
      ],
      ownerOnly: true,
    });
  }

  async exec(message: Message, args: { commandID: string }) {
    this.handler.reload(args.commandID);
    return message.util?.reply(`Reloaded command ${args.commandID}!`);
  }
}
