import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['deg/mm', 'degree', 'degree/mm'],
	description: 'Converts a sensitivity value to deg/mm',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-deg *Sensitivity* *GameName* *CPI*
	→ fps-deg *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`deg/mm\`, \`degree\` and \`degree/mm\`

	🔍 **| Extended Help**
	The deg command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric degree per millimeter.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-deg *2* *cs* *800*
	→ fps-deg *3* *0.006* *1600*
	`,
})
export default class CMCommand extends Command {
	public async run(message: Message, args: Args) {
		const sens = await args.pick('float')
		const yaw = await args.pick('yaw')
		const cpi = await args.pick('float')
		const output = (cpi * yaw * sens) / 25.4
		return message.reply(`${parseFloat(output.toFixed(5))} deg/mm`)
	}
}
