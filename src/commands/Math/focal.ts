import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['focal-length-scaling', 'visomotor', 'focal-length'],
	description:
		'Focal length scales a desired sensitivity between two FoV values of the same type',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-focal *Sensitivity* *InputFoV* *OutputFoV*

	🖇️ **| Aliases**: \`focallength\`, \`visomotor\` and \`focallength\`

	🔍 **| Extended Help**
	The Focal command focal-length scales a desired sensitivity between two FoV values of the same type.

	Focal-length scaling is a method of scaling a sensitivity so that there is a similar feel between multiple sensitivities to counteract the apparent effects of changing FoV values. i.e. For ADS(aiming down sights) sensitivity calculation if the game does not have an inbuilt scaler or transferring FoV between games if they have the same type.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **FoV**: The in-game FoV value or equivalent FoV value. Both the FoV values must be of the same FILM scaling type use the \`fovconvert\` command to convert between the types.

	🔗 **| Examples**
	→ fps-focal *2* *100* *90*
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES'],
	cooldownLimit: 1,
	cooldownDelay: 0,
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const sens = await args.pick('float')
		const inFOV = await args.pick('float')
		const outFOV = await args.pick('float')
		const output =
			(Math.tan((outFOV * Math.PI) / 360) /
				Math.tan((inFOV * Math.PI) / 360)) *
			sens
		return message.reply(parseFloat(output.toFixed(5)).toString())
	}
}
