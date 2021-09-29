import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['cm-info'],
	description: 'Displays an explanation for what cm/rev(cm/360) is',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-cminfo

	🖇️ **| Aliases**: \`cm-info\`
	`
})
export default class CMInfoCommand extends Command {
	public async run(message: Message) {
		return message.reply(
			'cm/rev also known as cm/360 is a universal metric used for describing mouse sensitivity across all games. The definition is: how much centimeters you need to move your mouse in order to perform a 360 degree turn in-game.\n\nTo calculate yours use the `cm` command'
		);
	}
}
