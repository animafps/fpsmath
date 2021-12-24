import { LogLevel } from '@sapphire/framework'
import * as Sentry from '@sentry/node'
import '@sapphire/plugin-api/register'
import '@sapphire/plugin-logger/register'
import 'dotenv/config'
import { FPSMathClient } from '#lib/FPSMathClient'

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
	intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
	partials: ['MESSAGE', 'CHANNEL'],
	presence: {
		status: 'online',
		activities: [{ name: 'fps-help | fpsmath.xyz', type: 'PLAYING' }],
	},
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
	client.destroy()
	process.exit(1)
})

void main()
