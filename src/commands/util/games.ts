import { games } from "../../array";
import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";

export default class GamesCommand extends Command {
  constructor() {
    super("games", {
      aliases: ["games", "supported-games"],
      description: {
        content: "Displays the supported games for this bot",
        usage: "",
      },
    });
  }

  async exec(message: Message): Promise<Message> {
    const Embed = new MessageEmbed()
      .setColor("#0099ff")
      .addField("Supported Games:", `\n` + games());
    return message.util?.send(Embed) || message.reply(Embed);
  }
}
