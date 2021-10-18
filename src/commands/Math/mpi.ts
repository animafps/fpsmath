import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['mpi', 'milliradian', 'mrad/inch', 'milliradian/inch'],
	description: 'Converts a sensitivity value to MPI (mrad/inch)',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-mpi *Sensitivity* *GameName* *CPI*
	→ fps-mpi *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`mpi\`, \`milliradian\`, \`mrad/inch\` and \`milliradian/inch\`

	🔍 **| Extended Help**
	The mpi command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric milliradian per inch.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-mpi *2* *cs* *800*
	→ fps-mpi *3* *0.006* *1600*
	`,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const sens = await args.pick('float')
		const yaw = await args.pick('yaw')
		const cpi = await args.pick('float')
		const output = cpi * yaw * sens * 60
		return message.reply(`${parseFloat(output.toFixed(5))} MPI`)
	}
}
