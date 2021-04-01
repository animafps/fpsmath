import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";

module.exports = class infoCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "info",
      group: "util",
      memberName: "info",
      description: "Displays the major information about this bot",
      examples: ["info"],
    });
  }

  async run(message: CommandoMessage) {
    const Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("FPSMath Info")
      .setDescription(
        `Various links and info to help you get to know me \n\nMe: <@792712521546465301>\nID: 792712521546465301\n`
      )
      .addField("Version", "v2.0\n")
      .addField("Links", "[**Bot Invite**](https://top.gg/bot/792712521546465301/invite)\nInvite FPSMath\n\n[**Documentation**](https://github.com/AnimaFPS/FPSMath)\nGuides, Commands and everything else you need\n\n[**Developer**](https://twitter.com/AnimaFPS)\nMy developers social media\n\n[**Support Server Invite**](https://discord.gg/xJdQxps)\nNeed Assistance? Join and find support")
    return message.say(Embed);
  }
};
