import {
	CommandInteraction,
	Message,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
} from 'discord.js'
import { Command, CommandOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['bot-invite'],
	description: 'Invite the bot to your sever',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-invite

	🖇️ **| Aliases**: \`invite\` and \`bot-invite\`
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const row = this.createRow()
		const embed = this.createEmbed()
		return message.reply({
			components: [row],
			embeds: [embed],
		})
	}

	public chatInputRun(interaction: CommandInteraction) {
		const row = this.createRow()
		const embed = this.createEmbed()
		return interaction.reply({
			embeds: [embed],
			components: [row],
		})
	}

	public createRow() {
		return new MessageActionRow().addComponents([
			new MessageButton()
				.setLabel('Invite FPSMath to your server')
				.setURL(
					`https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&permissions=19456&scope=bot%20applications.commands`
				)
				.setStyle('LINK'),
			new MessageButton()
				.setLabel('Join Support Server')
				.setURL('https://discord.gg/Bg2gNT35s9')
				.setStyle('LINK'),
		])
	}

	public createEmbed() {
		return new MessageEmbed().addField(
			'Invites',
			`[Invite FPSMath to your server](https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&permissions=19456&scope=bot%20applications.commands)\n\n[Join Support Server](https://discord.gg/Bg2gNT35s9)\n\nOr click one of the buttons below`
		)
	}
}
