import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['inch/rev', 'inch/360', 'inch/revolution'],
	description: 'Converts a sensitivity value to inch/rev (inch/360)',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-inch *Sensitivity* *GameName* *CPI*
	→ fps-inch *Sensitivity* *Yaw* *CPI*

	🖇️ **| Aliases**: \`inch/rev\`, \`inch/360\` and \`inch/revolution\`

	🔍 **| Extended Help**
	The inch command converts a sensitivity value, game name or yaw value and a cpi value into the universal metric inch per revolution.

	⚙ **| Explained usage**
	→ **Sensitivity**: The in-game sensitivity value for the game provided.
	→ **GameName**: The name of the game that is tied to the sensitivity. The games supported and the aliases that are compatible use the \`games\` command.
	→ **Yaw**: The yaw value from the game that is associated with the sensitivity. The yaw is equaled to/calculated by the rotational increment in degrees divided by the sensitivity.
	→ **CPI**: The CPI value of the mouse used. CPI is also known as DPI.

	🔗 **| Examples**
	→ fps-inch *2* *cs* *800*
	→ fps-inch *3* *0.006* *1600*
	`
})
export default class InchCommand extends Command {
	public async run(message: Message, args: Args) {
		const sens = await args.pick('float');
		const yaw = await args.pick('yaw');
		const cpi = await args.pick('float');
		const output = 360 / (cpi * yaw * sens);
		return message.reply(`${parseFloat(output.toFixed(5))} inch/rev`);
	}
}
