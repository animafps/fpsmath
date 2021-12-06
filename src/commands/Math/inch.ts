import {
	ApplicationCommandRegistry,
	Command,
	CommandOptions,
	RegisterBehavior,
} from '@sapphire/framework'
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { filterMap } from '../../helpers/array'

@ApplyOptions<CommandOptions>({
	aliases: ['inch/rev', 'inch/360', 'inch/revolution'],
	description: 'Converts a sensitivity value to inch/rev (inch/360)',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-inch *Sensitivity* *GameName* *CPI*
	→ fps-inch *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`inch/rev\`, \`inch/360\` and \`inch/revolution\`

	🔍 **| Extended Help**
	The inch command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric inch per revolution.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-inch *2* *cs* *800*
	→ fps-inch *3* *0.006* *1600*
	`,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export class UserCommand extends Command {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry
	) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description,
				options: [
					{
						type: 'NUMBER',
						name: 'sensitivity',
						description:
							'The in-game sensitivity value for the game provided',
						required: true,
					},
					{
						type: 'STRING',
						name: 'game',
						description: 'The game that is tied to the sensitivity',
						required: true,
						autocomplete: true,
					},
					{
						type: 'NUMBER',
						name: 'cpi',
						description:
							'The CPI value of the mouse used. CPI is also known as DPI.',
						required: true,
					},
				],
			},
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		)
	}

	public async chatInputRun(interaction: CommandInteraction) {
		if (
			!interaction.options.getNumber('custom-yaw') &&
			interaction.options.getNumber('game') === 0
		) {
			return interaction.reply('No custom yaw inputted')
		}
		const sens = interaction.options.getNumber('sensitivity') ?? 1
		const yaw =
			(interaction.options.getNumber('custom-yaw') ||
				interaction.options.getNumber('game')) ??
			1
		const cpi = interaction.options.getNumber('cpi') ?? 1
		const output = 360 / (cpi * yaw * sens)
		return interaction.reply(`${parseFloat(output.toFixed(5))} inch/rev`)
	}

	public autocompleteRun(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused()
		const filtered = filterMap(focusedValue.toString(), 'yaw')
		return interaction.respond(filtered)
	}
}
