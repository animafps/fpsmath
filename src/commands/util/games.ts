import { games } from "../../array";
import { Command, CommandoClient } from "discord.js-commando";
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

  async run(message: { say: (arg0: any) => any }) {
    const Embed = new MessageEmbed().addField(
      "Supported Games:",
      `\`\`\`${games()}\`\`\``
    );
    return message.say(Embed);
  }
};
