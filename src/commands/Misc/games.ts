import { Command, CommandOptions } from '@sapphire/framework'
import type { CommandInteraction } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { map } from '../../helpers/array'

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
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public chatInputRun(interaction: CommandInteraction) {
		let result = ''
		for (const game of map) {
			result += `→  ${game[0]}: ${game[1].film ? '🎥' : ''}${
				game[1].yaw ? '🖱️' : ''
			}\n`
		}
		return interaction.reply(
			`**__Supported Games__**:\n\n${result}\n\n__Key__:\n→ 🎥: FoV scaling support\n→ 🖱️: Yaw/Sensitivity support\n\nTotal games supported: ${map.size}`
		)
	}
}
