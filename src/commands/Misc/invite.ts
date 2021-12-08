import {
	CommandInteraction,
	Message,
	MessageActionRow,
	MessageButton,
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
		return message.reply({
			content: 'Click on of the buttons below:',
			components: [row],
		})
	}

	public chatInputRun(interaction: CommandInteraction) {
		const row = this.createRow()
		return interaction.reply({
			content: 'Click one of the buttons below:',
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
}
