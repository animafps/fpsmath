import { Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { filmToFilm } from '../../helpers/fovHelper'

@ApplyOptions<CommandOptions>({
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
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const output = filmToFilm(fov, inFILM, outFILM, aspect)
		return message.reply(`${parseFloat(output.toFixed(5))}°`)
	}
}
