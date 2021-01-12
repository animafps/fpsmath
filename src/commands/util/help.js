const { stripIndents, oneLine } = require('common-tags');
const commando = require('discord.js-commando');
const { disambiguation } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class HelpCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'util',
      memberName: 'help',
      aliases: ['commands'],
      description:
        'Displays a list of available commands, or detailed information for a specified command.',
      details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
      examples: ['help', 'help prefix'],
      format: '`[command]`',

      guarded: true,

      args: [
        {
          key: 'command',
          prompt: 'Which command would you like to view the help for?',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  async run(msg, args) {
    const groups = this.client.registry.groups;
    const commands = this.client.registry.findCommands(
      args.command,
      false,
      msg
    );
    const showAll = args.command && args.command.toLowerCase() === 'all';
    if (args.command && !showAll) {
      if (commands.length === 1) {
        const commandhelpEmbed = new discord.MessageEmbed()
          .setTitle(`Command Help - ${commands[0].name}`)
          .setColor('#0099ff')
          .setDescription(
            stripIndents`${oneLine`
                ${commands[0].description}
                ${commands[0].guildOnly ? ' (Usable only in servers)' : ''}
                ${commands[0].nsfw ? ' (NSFW)' : ''}
                
            `}
            Key: <required|alternitive option> [optional] \"exact\"`
          )
          .addField(
            'Format',
            stripIndents`${msg.anyUsage(
              `${commands[0].name}${
                commands[0].format ? ` ${commands[0].format}` : ''
              }`
            )}`
          );
        if (commands[0].aliases.length > 0) {
          commandhelpEmbed.addField('Aliases', commands[0].aliases.join(', '));
        }
        commandhelpEmbed.addField(
          'Group',
          stripIndents`${oneLine`
                    **Group:** ${commands[0].group.name}
                    (\`${commands[0].groupID}:${commands[0].memberName}\`)
                `}`
        );
        if (commands[0].details) {
          commandhelpEmbed.addField('Details', commands[0].details);
        }
        if (commands[0].examples) {
          commandhelpEmbed.addField(
            'Examples',
            `${commands[0].examples.join('\n')}`
          );
        }
        commandhelpEmbed.addField(
          'Quick Links',
          // eslint-disable-next-line prettier/prettier
          "[**Github/ README.md**](https://github.com/animafps/fpsmath) | [**Invite to your server**](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240) | [**Dev's Twitter**](https://twitter.com/animafps)"
        );
        const messages = [];
        try {
          messages.push(await msg.direct(commandhelpEmbed));
          if (msg.channel.type !== 'dm') {
            messages.push(await msg.reply('Sent you a DM with information.'));
          }
        } catch (err) {
          console.log(err);
          messages.push(
            await msg.reply(
              'Unable to send you the help DM. You probably have DMs disabled.'
            )
          );
        }
        return messages;
      } else if (commands.length > 15) {
        return msg.reply('Multiple commands found. Please be more specific.');
      } else if (commands.length > 1) {
        return msg.reply(disambiguation(commands, 'commands'));
      } else {
        return msg.reply(
          `Unable to identify command. Use ${msg.usage(
            null,
            msg.channel.type === 'dm' ? null : undefined,
            msg.channel.type === 'dm' ? null : undefined
          )} to view the list of all commands.`
        );
      }
    } else {
      const messages = [];
      try {
        const generalhelpEmbed = new discord.MessageEmbed()
          .setTitle('FPSMath Help')
          .setColor('#0099ff')
          .setDescription(
            stripIndents`
                        Global Prefix: **${this.client.commandPrefix}**
                        ${oneLine`
                            To run a command in ${
                              msg.guild ? msg.guild.name : 'any server'
                            },
                            use **${commando.Command.usage(
                              '<command>',
                              msg.guild ? msg.guild.commandPrefix : null,
                              this.client.user
                            )}**.
                            For example, **${commando.Command.usage(
                              'prefix',
                              msg.guild ? msg.guild.commandPrefix : null,
                              this.client.user
                            )}**.
                        `}
                        To run a command in this DM, simply use ${commando.Command.usage(
                          'command',
                          null,
                          null
                        )} with no prefix.
                        Use ${this.usage(
                          '<command>',
                          null,
                          null
                        )} to view detailed information about a specific command.
                        Use ${this.usage(
                          'all',
                          null,
                          null
                        )} to view a list of *all* commands, not just available ones.
                        \n
                        __**${
                          showAll
                            ? 'All commands'
                            : `Available commands in ${msg.guild || 'this DM'}:`
                        }**__
                    `
          );
        groups
          .filter(grp =>
            grp.commands.some(
              cmd => !cmd.hidden && (showAll || cmd.isUsable(msg))
            )
          )
          .forEach(grp =>
            generalhelpEmbed.addField(
              grp.name,
              `\`\`\`${grp.commands
                .filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg)))
                .map(
                  cmd =>
                    `${cmd.name}: ${cmd.description}${
                      cmd.nsfw ? ' (NSFW)' : ''
                    }`
                )
                .join('\n')}\`\`\``
            )
          );
        generalhelpEmbed.addField(
          'Quick Links',
          // eslint-disable-next-line prettier/prettier
          "[**Github/ README.md**](https://github.com/animafps/fpsmath) | [**Invite to your server**](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240) | [**Dev's Twitter**](https://twitter.com/animafps)"
        );
        messages.push(await msg.direct(generalhelpEmbed));

        if (msg.channel.type !== 'dm') {
          messages.push(await msg.reply('Sent you a DM with information.'));
        }
      } catch (err) {
        console.log(err);
        messages.push(
          await msg.reply(
            'Unable to send you the help DM. You probably have DMs disabled.'
          )
        );
      }
      return messages;
    }
  }
};
