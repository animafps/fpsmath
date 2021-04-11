import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "hello"],
      description: {
        content: "Checks the bots ping to discord",
      },
    });
  }

  async exec(message: Message): Promise<Message> {
    const sent = await message.reply("Pong!");
    const timeDiff =
      (sent?.editedAt?.getTime() || sent?.createdAt.getTime() || 1) -
      (message.editedAt?.getTime() || message.createdAt.getTime());
    return message.reply([
      "Pong!",
      `🔂 **RTT**: ${timeDiff} ms`,
      `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
    ]);
  }
}
