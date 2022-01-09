import { Events } from '#lib/types'
import { ChatInputCommandSuccessPayload, Listener } from '@sapphire/framework'

export class UserListener extends Listener<
	typeof Events.ChatInputCommandSuccess
> {
	public run(payload: ChatInputCommandSuccessPayload) {
		const command = payload.command
		this.container.client.emit(
			Events.CommandUsageAnalytics,
			command.name,
			command.category
		)
	}
}
