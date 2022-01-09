import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerErrorPayload } from '@sapphire/framework'
import { captureException } from '@sentry/node'

@ApplyOptions({ enabled: Boolean(process.env.SENTRY_DSN) })
export class UserListener extends Listener<typeof Events.ListenerError> {
	public run(error: Error, context: ListenerErrorPayload) {
		captureException(error, { tags: { name: context.piece.name } })
	}
}
