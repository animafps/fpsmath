import { Events } from '#lib/types/Enums'
import { ApplyOptions } from '@sapphire/decorators'
import {
	MessageCommandSuccessPayload,
	Listener,
	ListenerOptions,
} from '@sapphire/framework'

@ApplyOptions<ListenerOptions>({ event: Events.MessageCommandSuccess })
export class UserListener extends Listener<
	typeof Events.MessageCommandSuccess
> {
	public run(payload: MessageCommandSuccessPayload) {
		const command = payload.command
		this.container.client.emit(
			Events.CommandUsageAnalytics,
			command.name,
			command.category
		)
	}
}
