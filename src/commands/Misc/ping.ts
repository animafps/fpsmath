import { Command, CommandOptions } from '@sapphire/framework'
import type { CommandInteraction } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['pong'],
	description: 'Tests the latency',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-ping

	🖇️ **| Aliases**: \`pong\`
	`,
	requiredClientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction): Promise<any> {
		return interaction.reply(
			`Pong!\n💟 **Heartbeat**: ${Math.round(
				this.container.client.ws.ping
			)} ms`
		)
	}
}
