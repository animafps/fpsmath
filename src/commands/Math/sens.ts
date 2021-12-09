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
import { filterMap } from '../../helpers/array'

@ApplyOptions<CommandOptions>({
	aliases: [
		'sens-cm',
		'sens-deg',
		'sens-inch',
		'sens',
		'sens-mpi',
		'sens-arcmin',
		'sensitivity',
	],
	description:
		'Converts a universal sensitivity value to a game specific sensitivity',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-sens *Sensitivity* *GameName* *CPI*
	→ fps-sens *Sensitivity* *Yaw* *CPI*

    🚩 **| Flags**
    Append these to the end of the message to configure it for the desired input universal sensitivity
    it defaults to cm/rev as the input sensitivity so if inputting that you dont need a flag
    → **--deg**: For deg/mm
    → **--inch**: For inch/rev
    → **--mpi**: For MPI
    → **--arcmin**: For arcmin/inch

	🖇️ **| Aliases**: \`sens\` and \`sensitivity\`

	🔍 **| Extended Help**
	The sens command converts a universal sensitivity(cm/rev, inch/rev, deg/mm, mpi, arcmin) value to a game/yaw specific sensitivity.

	⚙ **| Explained usage**
	→ **Sensitivity**: The universal sensitivity value for the flag provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the output game. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-sens *28* *cs* *800*
	→ fps-sens *1.6* *0.006* *1600* *--deg*
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES'],
	flags: ['deg', 'inch', 'arcmin', 'cm'],
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
						type: 'STRING',
						name: 'sensitivity-type',
						description: 'The type of input universal sensitivity',
						required: true,
						choices: [
							{
								name: 'Centimeter per Revolution(cm/rev)',
								value: 'cm/rev',
							},
							{
								name: 'Inch per Revolution(inch/rev)',
								value: 'inch/rev',
							},
							{
								name: 'Millimeter per Degree(mm/deg)',
								value: 'mm/deg',
							},
							{
								name: 'Minute of Arc per Inch(arcmin)',
								value: 'arcmin',
							},
							{ name: 'Milliradian per Inch(mpi)', value: 'mpi' },
						],
					},
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

	public chatInputRun(interaction: CommandInteraction) {
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
		const type = interaction.options.getString('sensitivity-type', true)
		let output = 0
		switch (type) {
			case 'cm/rev':
				output = (2.54 * 360) / (cpi * yaw * sens)
				break
			case 'deg/mm':
				output = (cpi * yaw * 60) / sens
				break
			case 'inch/rev':
				output = 360 / (cpi * yaw * sens)
				break
			case 'mpi':
				output = (24.5 * sens) / (cpi * yaw)
				break
			case 'arcmin':
				output = (cpi * yaw * (1 / 60)) / sens
				break
		}
		return interaction.reply(parseFloat(output.toFixed(5)).toString())
	}

	public async messageRun(message: Message, args: Args) {
		const sens = await args.pick('float')
		const yaw = await args.pick('yaw')
		const cpi = await args.pick('float')
		let output: number
		if (args.getFlags('deg')) {
			output = (cpi * yaw * 60) / sens
		} else if (args.getFlags('inch')) {
			output = 360 / (cpi * yaw * sens)
		} else if (args.getFlags('mpi')) {
			output = (24.5 * sens) / (cpi * yaw)
		} else if (args.getFlags('arcmin')) {
			output = (cpi * yaw * (1 / 60)) / sens
		} else {
			output = (2.54 * 360) / (cpi * yaw * sens)
		}
		return message.reply(parseFloat(output.toFixed(5)).toString())
	}

	public autocompleteRun(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused()
		const filtered = filterMap(focusedValue.toString(), 'yaw')
		return interaction.respond(filtered)
	}
}
