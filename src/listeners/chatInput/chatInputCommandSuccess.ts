import { Events } from '#lib/types/Enums'
import { ApplyOptions } from '@sapphire/decorators'
import {
	ChatInputCommandSuccessPayload,
	Listener,
	ListenerOptions,
} from '@sapphire/framework'

@ApplyOptions<ListenerOptions>({ event: Events.ChatInputCommandSuccess })
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
