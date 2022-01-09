import {
	ChatInputCommandErrorPayload,
	Events,
	Listener,
} from '@sapphire/framework'
import { captureException } from '@sentry/node'

export class UserListener extends Listener<
	typeof Events.ChatInputCommandError
> {
	public run(error: Error, { command }: ChatInputCommandErrorPayload) {
		captureException(error, { tags: { command: command.name } })
	}
}
