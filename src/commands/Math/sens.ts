import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: [
		'sens-cm',
		'sens-deg',
		'sens-inch',
		'sens',
		'sens-mpi',
		'sens-arcmin',
	],
	description:
		'Converts a universal sensitivity value to a game specific sensitivity',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-arcmin *Sensitivity* *GameName* *CPI*
	→ fps-arcmin *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`minute-of-arc\`, \`arcmin/inch\` and \`minute-of-arc/inch\`

	🔍 **| Extended Help**
	The arcmin command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric minute of arch per inch.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-arcmin *2* *cs* *800*
	→ fps-arcmin *3* *0.006* *1600*
	`,
})
export default class SensCommand extends Command {
	public async run(message: Message, args: Args) {
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
}
