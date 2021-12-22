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
import {
	filmToFilm,
	parseAspect,
	aspectRatio,
	filmNotation,
} from 'fov-utilities'
import { filterMap } from '#lib/array'

@ApplyOptions<CommandOptions>({
	aliases: ['fov-convert', 'film-convert', 'convert-fov'],
	description:
		'Converts a FoV value from one game or FILM notation to another',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-fovconvert *FoV* *InputGameName* *OuputGameName* *Aspectratio*
	→ fps-fovconvert *FoV* *InputFILMNotation* *OutputFILMNotation* *Aspectratio*

	🖇️ **| Aliases**: \`fov-convert\`, \`film-convert\` and \`convert-fov\`

	🔍 **| Extended Help**
	The fovconvert command converts a FoV value from one game or FILM notation to another.
	Useful if you want to find the equivalent FoV between games that might have different scaling types.

	⚙ **| Explained usage**
	→ **FoV**: The in-game FoV value or equivalent FoV value.
	→ **GameName**: The name of the game that is tied to the FoV. The games supported and the aliases that are compatible use the \`games\` command.
	→ **FilmNotation**: See [Kovaak's article on FILM notation](https://www.kovaak.com/film-notation/)
	→ **AspectRatio**: The aspect ratio of the monitor or game screen size. i.e. \`horizontal:vertical\`

	🔗 **| Examples**
	→ fps-fovconvert *90* *cs* *ow* *16:9*
	→ fps-fovconvert *103* *ow* *r6s* *4:3*
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
						name: 'fov',
						description:
							'The in-game FoV value or equivalent FoV value',
						required: true,
					},
					{
						type: 'STRING',
						name: 'in-game',
						description:
							'The game that is tied to the input fov or FILM notation',
						required: true,
						autocomplete: true,
					},
					{
						type: 'STRING',
						name: 'out-game',
						description:
							'The game that is tied to the output fov or FILM notation',
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
		const inFILM = interaction.options.getString('in-game', true)
		const outFILM = interaction.options.getString('out-game', true)
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

		const output = filmToFilm(
			fov,
			inFILM.toUpperCase() as filmNotation,
			outFILM.toUpperCase() as filmNotation,
			aspect
		)
		return interaction.reply(`${parseFloat(output.toFixed(5))}°`)
	}

	public async messageRun(message: Message, args: Args) {
		const fov = await args.pick('float')
		const inFILM = await args.pick('film')
		const outFILM = await args.pick('film')
		const aspect = await args.pick('aspectRatio')
		const output = filmToFilm(fov, inFILM, outFILM, aspect)
		return message.reply(`${parseFloat(output.toFixed(5))}°`)
	}

	public autocompleteRun(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused()
		const filtered = filterMap(focusedValue.toString(), 'film')
		return interaction.respond(filtered)
	}
}
