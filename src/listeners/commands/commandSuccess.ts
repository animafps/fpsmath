import { Events } from '#lib/types/Enums'
import { ApplyOptions } from '@sapphire/decorators'
import {
	CommandSuccessPayload,
	Listener,
	ListenerOptions,
} from '@sapphire/framework'

@ApplyOptions<ListenerOptions>({ event: Events.CommandSuccess })
export class UserListener extends Listener<typeof Events.CommandSuccess> {
	public run(payload: CommandSuccessPayload) {
		const command = payload.command
		this.container.client.emit(
			Events.CommandUsageAnalytics,
			command.name,
			command.category
		)
	}
}
