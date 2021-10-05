import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['convert-sens'],
	description:
		'Converts different sensitivities from one game or yaw value to another',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-convert *Sensitivity* *InputGameName* *OutputGameName*
	→ fps-convert *Sensitivity* *InputYaw* *OutputYaw*

	🖇️ **| Aliases**: \`convert-sens\`

	🔍 **| Extended Help**
	Converts different sensitivities from one game or yaw value to another

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.

	🔗 **| Examples**
	→ fps-convert *2* *cs* *overwatch*
	→ fps-arcmin *3* *0.006* *0.022*
	`,
})
export default class ConvertCommand extends Command {
	public async run(message: Message, args: Args) {
		const sens = await args.pick('float')
		const inYaw = await args.pick('yaw')
		const outYaw = await args.pick('yaw')
		const output = sens * (inYaw / outYaw)
		return message.reply(parseFloat(output.toFixed(5)).toString())
	}
}
