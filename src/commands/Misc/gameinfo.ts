import { Args, Command, CommandOptions } from '@sapphire/framework'
import { Message, MessageEmbed } from 'discord.js'
import { get } from '../../lib/array'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['game-info', 'game'],
	description: 'Displays the information associated for a game',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-gameinfo *GameName*

	🖇️ **| Aliases**: \`game-info\` and \`game\`

	⚙ **| Explained usage**
	→ **GameName**: The name of the game that is tied to the object wanted. The games supported and the aliases that are compatible use the \`games\` command.

	🔗 **| Examples**
	→ fps-gameinfo *cs*
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const gameObject = get(await args.pick('game'))
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(gameObject?.name || 'Game Info')
					.setColor('#0099ff')
					.setTimestamp(Date.now())
					.setDescription(
						`
						🖇️ **| Aliases**: \`${gameObject?.aliases.join('`, `')}\`${
							gameObject?.yaw
								? `\n\n🖱️ **| Yaw**: \`${gameObject?.yaw}\``
								: ''
						}${
							gameObject?.film
								? `\n\n🎥 **| FILM Notation**: \`${gameObject?.film}\``
								: ''
						}
					`
					)
					.setFooter(`Game info`),
			],
		})
	}
}
