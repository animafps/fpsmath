// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development'

import { LogLevel } from '@sapphire/framework'
import * as Sentry from '@sentry/node'
import '@sapphire/plugin-api/register'
import '@sapphire/plugin-logger/register'
import { config } from 'dotenv-cra'
import { FPSMathClient } from '#lib/FPSMathClient'
import { start } from '@sapphire/plugin-hmr'

config()

const client = new FPSMathClient({
	fetchPrefix: (msg) =>
		msg.guild
			? [process.env.PREFIX ?? 'fps-']
			: [process.env.PREFIX ?? 'fps-', ''],
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug,
	},
	shards: 'auto',
	intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES'],
	partials: ['MESSAGE', 'CHANNEL'],
	presence: {
		status: 'online',
		activities: [{ name: 'fps-help | fpsmath.xyz', type: 'PLAYING' }],
	},
	loadMessageCommandListeners: true,
})

const main = async () => {
	if (process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			integrations: [
				new Sentry.Integrations.Modules(),
				new Sentry.Integrations.FunctionToString(),
				new Sentry.Integrations.LinkedErrors(),
				new Sentry.Integrations.Console(),
				new Sentry.Integrations.Http({
					breadcrumbs: true,
					tracing: true,
				}),
			],
		})
	}
	try {
		client.logger.info('Logging in')
		await client.login()
		client.logger.info(`Logged in`)
		if (process.env.NODE_ENV === 'development') {
			start()
		}
	} catch (error) {
		client.logger.fatal(error)
		client.destroy()
		process.exit(1)
	}
}

process.on('unhandledRejection', (reason: string) => {
	throw reason
})

process.on('uncaughtException', (error: Error) => {
	client.logger.fatal(error)
	Sentry.captureException(error, { level: Sentry.Severity.Fatal })
	client.destroy()
	process.exit(1)
})

void main()
