import { MessageEmbed, Message } from 'discord.js'
import { Command, CommandOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['bot-info'],
	description: 'Info about the bot',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-info

	🖇️ **| Aliases**: \`bot-info\`
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
})
export class UserCommand extends Command {
	public async run(message: Message) {
		const Embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('FPSMath - Info')
			.setDescription(
				`Various links and info to help you get to know me \n\nMe: <@${message.client.user?.id}>\nID: ${message.client.user?.id}\n`
			)
			.addField('Version', `v${process.env.npm_package_version}`)
			.addField(
				'Links',
				`[**Bot Invite**](https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&scope=bot&permissions=19520)\nInvite FPSMath\n\n[**Documentation**](https://fpsmath.animafps.xyz)\nGuides, Commands and everything else you need\n\n[**Developer**](https://animafps.xyz)\nMy developers website\n\n[**Support Server Invite**](https://discord.gg/xJdQxps)\nNeed Assistance? Join and find support\n\n[**Source Code**](https://github.com/animafps/fpsmath)`
			)
			.setTimestamp(Date.now())
		return message.reply({ embeds: [Embed] })
	}
}
