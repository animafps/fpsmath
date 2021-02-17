import { games } from "../../array";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";

module.exports = class gamesCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "games",
      group: "util",
      memberName: "games",
      description: "Displays the supported games for this bot",
      examples: ["games"],
    });
  }

  async run(message: CommandoMessage) {
    const Embed = new MessageEmbed()
      .setColor("#0099ff")
      .addField("Supported Games:", `\`\`\`${games()}\`\`\``);
    return message.say(Embed);
  }
};
