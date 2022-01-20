import { Events, Listener } from '@sapphire/framework'
import { captureException } from '@sentry/node'
import { DiscordAPIError, HTTPError } from 'discord.js'

const NEWLINE = '\n'

export class UserListener extends Listener<typeof Events.Error> {
	public run(error: Error) {
		captureException(error)
		const { logger } = this.container
		if (error instanceof DiscordAPIError) {
			logger.warn(
				`[API ERROR] [CODE: ${error.code}] ${error.message}${NEWLINE}            [PATH: ${error.method} ${error.path}]`
			)
			logger.fatal(error.stack)
		} else if (error instanceof HTTPError) {
			logger.warn(
				`[HTTP ERROR] [CODE: ${error.code}] ${error.message}${NEWLINE}             [PATH: ${error.method} ${error.path}]`
			)
			logger.fatal(error.stack)
		} else {
			logger.error(error)
		}
	}
}
