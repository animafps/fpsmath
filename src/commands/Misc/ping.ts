import { Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
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
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const sent = await message.reply('Pong!')
		const timeDiff =
			(sent?.editedAt?.getTime() || sent?.createdAt.getTime() || 1) -
			(message.editedAt?.getTime() || message.createdAt.getTime())
		return sent.edit(
			`Pong!\n🔂 **RTT**: ${timeDiff} ms\n💟 **Heartbeat**: ${Math.round(
				this.container.client.ws.ping
			)} ms`
		)
	}
}
