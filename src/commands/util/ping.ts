import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "hello"],
    });
  }

  async exec(message: Message) {
    const sent = await message.util?.reply("Pong!");
    const timeDiff =
      (sent?.editedAt?.getTime() || sent?.createdAt.getTime() || 1) -
      (message.editedAt?.getTime() || message.createdAt.getTime());
    return message.util?.reply([
      "Pong!",
      `🔂 **RTT**: ${timeDiff} ms`,
      `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
    ]);
  }
}
