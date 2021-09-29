import { SapphireClient, LogLevel } from '@sapphire/framework';
import * as Sentry from '@sentry/node';
import { Poster } from 'dbots';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-logger/register';
import 'dotenv/config';

const client = new SapphireClient({
	fetchPrefix: (msg) => (msg.guild ? [process.env.PREFIX ?? 'fps-'] : [process.env.PREFIX ?? 'fps-', '']),
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
	partials: ['MESSAGE', 'CHANNEL'],
	presence: {
		status: 'online',
		activities: [{ name: 'fps-help', type: 'LISTENING' }]
	}
});

const main = async () => {
	if (process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN
		});
	}
	if (process.env.TOPGG_API_TOKEN && process.env.DISCORDBOTLIST_TOKEN && process.env.DISCORDBOTSGG_TOKEN) {
		const poster = new Poster({
			client,
			apiKeys: {
				topgg: process.env.TOPGG_API_TOKEN,
				discordbotlist: process.env.DISCORDBOTLIST_TOKEN,
				discordbotsgg: process.env.DISCORDBOTSGG_TOKEN
			},
			clientLibrary: 'discord.js'
		});
		poster.addHandler('postSuccess', () => client.logger.debug('Api Post Success'));
		void poster.post('all');
		poster.startInterval();
	}
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info(`Logged in`);
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

void main();
