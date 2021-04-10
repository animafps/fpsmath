import { stripIndents, oneLine } from "common-tags";
import { Command, CommandHandler } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
function generalHelp(command: Command, msg: Message, handler: CommandHandler) {
  const commandHelpEmbed = new MessageEmbed()
    .setTitle(`Command Help - ${command.id}`)
    .setColor("#0099ff")
    .setDescription(
      stripIndents`
        ${command.description.content}
                 
        Key: <required|alternative option> [optional] \"exact\"`
    )
    .addField(
      "Format",
      `\`${handler.prefix}${command.id} ${command.description.usage}\``
    )
    .addField("Aliases", command.aliases.join(", "))
    .addField("Group", command.categoryID)
    .addField(
      "Examples",
      `\`\`${command.description.examples.forEach(
        (value: string) => `${value}\n`
      )}\`\``
    )
    .addField(
      "Quick Links",
      "[**Documentation/ Github**](https://github.com/animafps/fpsmath) | [**Invite or Upvote the bot**](https://top.gg/bot/792712521546465301/)"
    );
  return commandHelpEmbed;
}

function commandHelp(
  msg: Message,
  showAll: string | boolean | undefined,
  groups: any,
  handler: CommandHandler
) {
  const generalHelpEmbed = new MessageEmbed()
    .setTitle("FPSMath Help")
    .setColor("#0099ff")
    .setDescription(
      stripIndents`
                        Global Prefix: **${handler.prefix}**
                        ${oneLine`
                            To run a command in ${
                              msg.guild ? msg.guild.name : "any server"
                            },
                            use \`\`${
                              msg.guild ? handler.prefix : ""
                            }<command>\`\`.
                            For example, \`\`${
                              msg.guild ? handler.prefix : ""
                            }prefix\`\`.
                        `}
                        ${
                          msg.guild
                            ? "To run a command in this DM, simply use ``command`` with no prefix"
                            : ""
                        }
                        Use \`\`${
                          msg.guild ? handler.prefix : ""
                        }help <command>\`\` to view detailed information about a specific command.
                        Use \`\`${
                          msg.guild ? handler.prefix : ""
                        }help all\`\` to view a list of *all* commands, not just available ones.
                        \n
                        __**${
                          showAll
                            ? "All commands"
                            : `Available commands in ${msg.guild || "this DM"}:`
                        }**__
                    `
    );
  console.log(groups.entries().next().value[0]);
  generalHelpEmbed.addField(
    "Quick Links",
    "[**Documentation/ Github**](https://github.com/animafps/fpsmath) | [**Invite or Upvote the bot**](https://top.gg/bot/792712521546465301/)"
  );
  return generalHelpEmbed;
}
export default class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["commands", "help"],
      description:
        "Displays a list of available commands, or detailed information for a specified command.",
      args: [
        {
          id: "command",
          type: "string",
          default: "",
        },
      ],
    });
  }

  async exec(msg: Message, args: { command?: string }) {
    const groups = this.handler.categories;
    const command = this.handler.findCommand(args.command || "");
    const showAll = args.command && args.command.toLowerCase() === "all";
    if (args.command && !showAll) {
      const messages = [];
      try {
        messages.push(
          await msg?.author.send(generalHelp(command, msg, this.handler))
        );
        if (msg?.channel.type !== "dm") {
          messages.push(
            await msg?.util?.reply("Sent you a DM with information.")
          );
        }
      } catch (err) {
        messages.push(
          await msg?.reply(
            "Unable to send you the help DM. You probably have DMs disabled."
          )
        );
      }
      return messages;
    } else {
      const messages = [];
      try {
        messages.push(
          await msg.author.send(commandHelp(msg, showAll, groups, this.handler))
        );

        if (msg.channel.type !== "dm") {
          messages.push(await msg.reply("Sent you a DM with information."));
        }
      } catch (err) {
        console.log(err);
        messages.push(
          await msg.reply(
            "Unable to send you the help DM. You probably have DMs disabled."
          )
        );
      }
      return messages;
    }
  }
}
