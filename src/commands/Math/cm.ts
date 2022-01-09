import {
	ApplicationCommandRegistry,
	Args,
	Command,
	CommandOptions,
	RegisterBehavior,
} from '@sapphire/framework'
import type {
	AutocompleteInteraction,
	CommandInteraction,
	Message,
} from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['cm/rev', 'cm/360', 'cm'],
	description: 'Converts a sensitivity value to cm/rev (cm/360)',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-cm *Sensitivity* *GameName* *CPI*
	→ fps-cm *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`cm/rev\`, \`cm/360\`, and \`cm\`

	🔍 **| Extended Help**
	The cm command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric centimeters per full in-game revolution(cm/rev).

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-cm *2* *cs* *800*
	→ fps-cm *3* *0.006* *1600*
	`,
	requiredClientPermissions: ['SEND_MESSAGES'],
	options: ['sensitivity'],
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
		const yaw = Number(interaction.options.getString('game', true))
		if (isNaN(yaw))
			return interaction.reply({
				content: `Error: \`${interaction.options.getString(
					'game'
				)}\` is not a valid number`,
				ephemeral: true,
			})
		const sens = interaction.options.getNumber('sensitivity', true)
		const cpi = interaction.options.getNumber('cpi', true)
		const output = (2.54 * 360) / (cpi * yaw * sens)
		return interaction.reply(`${parseFloat(output.toFixed(5))} cm/rev`)
	}

	public async messageRun(message: Message, args: Args) {
		const sens = await args.pick('float')
		const yaw = await args.pick('yaw')
		const cpi = await args.pick('float')
		const output = (2.54 * 360) / (cpi * yaw * sens)
		return message.reply(`${parseFloat(output.toFixed(5))} cm/rev`)
	}

	public autocompleteRun(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused()
		const filtered = this.container.games.filterMap(
			focusedValue.toString(),
			'yaw'
		)
		return interaction.respond(filtered)
	}
}
