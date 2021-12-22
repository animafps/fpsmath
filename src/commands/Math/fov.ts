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
import { filterMap } from '#lib/array'
import {
	aspectRatio,
	filmNotation,
	filmToTrue,
	parseAspect,
} from 'fov-utilities'

@ApplyOptions<CommandOptions>({
	aliases: ['fov-scaling', 'film'],
	description:
		'Finds the true vertical and horizontal FoV that is being displayed on screen',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-fov *FoV* *GameName* *AspectRatio*
	→ fps-fov *FoV* *FILMNotation* *AspectRatio*

	🖇️ **| Aliases**: \`fov-scaling\` and \`film\`

	🔍 **| Extended Help**
	Finds the true vertical or horizontal FoV for certain aspect ratio that the game is being rendered at plus game's FoV scaling method

	⚙ **| Explained usage**
	→ **FoV**: The in-game FoV value or equivalent FoV value.
	→ **GameName**: The name of the game that is tied to the FoV. The games supported and the aliases that are compatible use the \`games\` command.
	→ **FilmNotation**: See [Kovaak's article on FILM notation](https://www.kovaak.com/film-notation/)
	→ **AspectRatio**: The aspect ratio of the monitor or game screen size. i.e. \`horizontal:vertical\`

	🔗 **| Examples**
	→ fps-fov *90* *cs* *16:9*
	→ fps-fov *103* *ow* *4:3*
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export default class UserCommand extends Command {
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
						name: 'fov',
						description:
							'The in-game FoV value or equivalent FoV value',
						required: true,
					},
					{
						type: 'STRING',
						name: 'game',
						description:
							'The game that is tied to the fov or FILM notation',
						required: true,
						autocomplete: true,
					},
					{
						type: 'STRING',
						name: 'aspect-ratio',
						description:
							'The aspect ratio of the monitor or game screen size. i.e. horizontal:vertical',
						required: true,
					},
				],
			},
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		)
	}

	public chatInputRun(interaction: CommandInteraction) {
		const fov = interaction.options.getNumber('fov', true)
		const film = interaction.options.getString('game', true)
		const aspect = parseAspect(
			interaction.options.getString('aspect-ratio', true) as aspectRatio
		)
		if (!aspect)
			return interaction.reply({
				content: `Error: \`${interaction.options.getString(
					'aspect-ratio'
				)}\` Not valid aspect ratio`,
				ephemeral: true,
			})

		const { horizontalFOV, verticalFOV } = filmToTrue(
			fov,
			film.toUpperCase() as filmNotation,
			aspect
		)

		return interaction.reply(
			`Horizontal FoV: ${parseFloat(
				horizontalFOV.toFixed(5)
			)}°\nVertical FoV: ${parseFloat(verticalFOV.toFixed(5))}°`
		)
	}

	public async messageRun(message: Message, args: Args) {
		const fov = await args.pick('float')
		const film = await args.pick('film')
		const aspect = await args.pick('aspectRatio')
		const { horizontalFOV, verticalFOV } = filmToTrue(fov, film, aspect)
		return message.reply(
			`Horizontal FoV: ${parseFloat(
				horizontalFOV.toFixed(5)
			)}°\nVertical FoV: ${parseFloat(verticalFOV.toFixed(5))}°`
		)
	}

	public autocompleteRun(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused()
		const filtered = filterMap(focusedValue.toString(), 'film')
		return interaction.respond(filtered)
	}
}
