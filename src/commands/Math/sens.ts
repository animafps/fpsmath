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
