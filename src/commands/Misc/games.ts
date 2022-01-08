import { Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['supported-games'],
	description: 'Sends a list of all the supported games',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-games

	🖇️ **| Aliases**: \`supported-games\` and \`supportedgames\`
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		let result = ''
		for (const game of this.container.games.sort((a, b) =>
			a.name.localeCompare(b.name)
		)) {
			result += `• ${game[0]}: \`${game[1].aliases.join(', ')}\` ${
				game[1].film ? '🎥' : ''
			}${game[1].yaw ? '🖱️' : ''}\n`
		}
		try {
			await message.author.send(
				`**__Supported Games__**:\n\n${result}\n\n__Key__:\n→ 🎥: FoV scaling support\n→ 🖱️: Yaw/Sensitivity support\n\nTotal games supported: ${this.container.games.size}`
			)
			if (message.guild) {
				return message.reply('Sent you a DM with information.')
			}
			return
		} catch (err) {
			return message.reply(
				'Unable to send you the games list DM. You probably have DMs disabled.'
			)
		}
	}
}
