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
	aliases: ['convert-sens', 'convert-sensitivities'],
	description:
		'Converts different sensitivities from one game or yaw value to another',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-convert *Sensitivity* *InputGameName* *OutputGameName*
	→ fps-convert *Sensitivity* *InputYaw* *OutputYaw*

	🖇️ **| Aliases**: \`convert-sens\`

	🔍 **| Extended Help**
	Converts different sensitivities from one game or yaw value to another

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.

	🔗 **| Examples**
	→ fps-convert *2* *cs* *overwatch*
	→ fps-arcmin *3* *0.006* *0.022*
	`,
	generateDashLessAliases: true,
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
						name: 'ingame',
						description:
							'The game that is tied to the input sensitivity',
						required: true,
						autocomplete: true,
					},
					{
						type: 'STRING',
						name: 'outgame',
						description:
							'The game that is tied to the output sensitivity',
						required: true,
						autocomplete: true,
					},
				],
			},
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		)
	}

	public chatInputRun(interaction: CommandInteraction) {
		const sens = interaction.options.getNumber('sensitivity', true)
		const inYaw = Number(interaction.options.getString('ingame', true))
		if (isNaN(inYaw))
			return interaction.reply({
				content: `Error: \`${interaction.options.getString(
					'ingame'
				)}\` is not a valid number`,
				ephemeral: true,
			})
		const outYaw = Number(interaction.options.getString('outgame', true))
		if (isNaN(outYaw))
			return interaction.reply({
				content: `Error: \`${interaction.options.getString(
					'outgame'
				)}\` is not a valid number`,
				ephemeral: true,
			})
		const output = sens * (inYaw / outYaw)
		return interaction.reply(parseFloat(output.toFixed(5)).toString())
	}

	public async messageRun(message: Message, args: Args) {
		const sens = await args.pick('float')
		const inYaw = await args.pick('yaw')
		const outYaw = await args.pick('yaw')
		const output = sens * (inYaw / outYaw)
		return message.reply(parseFloat(output.toFixed(5)).toString())
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
