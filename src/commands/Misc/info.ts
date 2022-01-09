import { MessageEmbed, CommandInteraction, Message } from 'discord.js'
import { Command, CommandOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['bot-info'],
	description: 'Various links and info to help you get to know the me',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-info

	🖇️ **| Aliases**: \`bot-info\`
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.reply({ embeds: [this.buildEmbed()] })
	}

	public chatInputRun(interaction: CommandInteraction) {
		return interaction.reply({ embeds: [this.buildEmbed()] })
	}

	public buildEmbed() {
		return new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('FPSMath - Info')
			.setDescription(
				`Various links and info to help you get to know me\n\nMe: <@${this.container.client.user?.id}>\nID: ${this.container.client.user?.id}\n`
			)
			.addField(
				'About Me',
				'A Discord bot designed to convert video game sensitivities, FoVs, mouse feel across themselves and preset games'
			)
			.addField(
				'Features',
				'• Has over 20 games supported and many more are added weekly so you can convert for your favorite games\n• Supports over 5 different units of sensitivity measurement(cm/rev, MPI, arcmin, deg/mm, inch/rev)\n• Allows for custom yaw values and FoV types so even if a game is not officially supported/aliased you can still do the calculations and conversions'
			)
			.addField(
				'Links',
				`[**Bot Invite**](https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&permissions=19456&scope=bot%20applications.commands)\nInvite FPSMath\n\n[**Documentation**](https://fpsmath.xyz)\nGuides, Commands and everything else you need\n\n[**Support Server Invite**](https://discord.gg/Bg2gNT35s9)\nNeed Assistance? Join and find support\n\n[**Source Code**](https://github.com/animafps/fpsmath)`
			)
			.setTimestamp(Date.now())
	}
}
