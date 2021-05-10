import { MessageEmbed, Message } from "discord.js";
import { Command } from "discord-akairo";
import * as app from "../../../package.json"

export default class InfoCommand extends Command {
  constructor() {
    super("info", {
      aliases: ["info", "botinfo", "information"],
      description: {
        content: "Info about the bot",
        usage: "",
      },
    });
  }

  async exec(message: Message): Promise<Message> {
    const Embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("FPSMath Info")
      .setDescription(
        `Various links and info to help you get to know me \n\nMe: <@${this.client.user?.id}>\nID: ${this.client.user?.id}\n`
      )
      .addField("Version", "v" + app.version)
      .addField(
        "Links",
        "[**Bot Invite**](https://top.gg/bot/792712521546465301/invite)\nInvite FPSMath\n\n[**Documentation**](https://github.com/fpsmath/fpsmath)\nGuides, Commands and everything else you need\n\n[**Developer**](https://twitter.com/AnimaFPS)\nMy developers social media\n\n[**Support Server Invite**](https://discord.gg/xJdQxps)\nNeed Assistance? Join and find support"
      );
    return message.reply(Embed);
  }
}
