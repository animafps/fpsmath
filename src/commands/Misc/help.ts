import { ApplyOptions } from '@sapphire/decorators'
import {
	Args,
	Command,
	CommandOptions,
	MessageCommand,
	MessageCommandContext,
} from '@sapphire/framework'
import { Collection, Message, MessageEmbed } from 'discord.js'

/**
 * Sorts a collection alphabetically as based on the keys, rather than the values.
 * This is used to ensure that subcategories are listed in the pages right after the main category.
 * @param _ The first element for comparison
 * @param __ The second element for comparison
 * @param firstCategory Key of the first element for comparison
 * @param secondCategory Key of the second element for comparison
 */
function sortCommandsAlphabetically(
	_: Command[],
	__: Command[],
	firstCategory: string,
	secondCategory: string
): 1 | -1 | 0 {
	if (firstCategory > secondCategory) return 1
	if (secondCategory > firstCategory) return -1
	return 0
}

@ApplyOptions<CommandOptions>({
	aliases: ['commands', 'cmd', 'cmds'],
	description: 'Displays all commands or the description of one',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-help
	→ fps-help *--all*
	→ fps-help *CommandName*

	🖇️ **| Aliases**: \`commands\`, \`cmd\`, and \`cmds\`

	🔍 **| Extended Help**
	The help command shows a list of all commands by their categories, or the extended information of a command if specified.

	🔗 **| Examples**
	→ fps-help
	→ fps-help *--all*
	→ fps-help *arcmin*
	`,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public async messageRun(
		message: Message,
		args: Args,
		context: MessageCommandContext
	) {
		const command = args.nextMaybe()
		return command.exists && !args.getFlags('all')
			? this.specific(message, command.value)
			: this.all(message, context)
	}

	private async specific(message: Message, commandName: string) {
		const command = this.container.stores.get('commands').get(commandName)
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`${command?.description}`)
					.setColor('#0099ff')
					.setDescription(`${command?.detailedDescription}`)
					.setFooter(`Command help for ${command?.name}`)
					.setTimestamp(Date.now()),
			],
		})
	}

	private async all(message: Message, context: MessageCommandContext) {
		const content = await this.buildHelp(message, context.commandPrefix)
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('FPSMath - Help')
					.setDescription(content)
					.setColor('#0099ff')
					.setTimestamp(Date.now()),
			],
		})
	}

	private async buildHelp(message: Message, prefix: string) {
		const commands = await this.fetchCommands(message)

		const helpMessage: string[] = []
		for (const [category, list] of commands) {
			helpMessage.push(
				`**${category} Commands**:\n`,
				list.map(this.formatCommand.bind(this, prefix)).join('\n'),
				''
			)
		}

		return helpMessage.join('\n')
	}

	private formatCommand(prefix: string, command: Command) {
		const { description } = command
		return `• **${prefix}${command.name}** → ${description}`
	}

	private async fetchCommands(message: Message) {
		const commands = this.container.stores.get('commands')
		const filtered = new Collection<string, Command[]>()
		await Promise.all(
			commands.map(async (cmd: Command) => {
				const command = cmd as MessageCommand

				const result = await cmd.preconditions.messageRun(
					message,
					command,
					{
						command: null,
					}
				)
				if (!result.success) return

				const category = filtered.get(command.fullCategory.join(' → '))
				if (category) category.push(command)
				else
					filtered.set(command.fullCategory.join(' → '), [
						command as MessageCommand,
					])
			})
		)

		return filtered.sort(sortCommandsAlphabetically)
	}
}
