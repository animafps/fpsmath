import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['cm/rev', 'cm/360', 'cm'],
	description: 'Converts a sensitivity value to cm/rev (cm/360)',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-cm *Sensitivity* *GameName* *CPI*
	→ fps-cm *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`cm/rev\`, \`cm/360\`, and \`cm\`

	🔍 **| Extended Help**
	The cm command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric centimeters per full in-game revolution(cm/rev).

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-cm *2* *cs* *800*
	→ fps-cm *3* *0.006* *1600*
	`,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export default class CMCommand extends Command {
	public async run(message: Message, args: Args) {
		const sens = await args.pick('float')
		const yaw = await args.pick('yaw')
		const cpi = await args.pick('float')
		const output = (2.54 * 360) / (cpi * yaw * sens)
		return message.reply(`${parseFloat(output.toFixed(5))} cm/rev`)
	}
}
