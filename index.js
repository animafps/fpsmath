require('dotenv').config();
const commando = require('discord.js-commando');
const winston = require('winston');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const { ownerID, token, prefix, invite } = require('./src/config.json');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'fpsmath' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

const client = new commando.Client({
  owner: process.env.OWNERID || ownerID,
  commandPrefix: process.env.PREFIX || prefix,
  invite: process.env.INVITE || invite,
});

client
  .on('warn', m => logger.warn(m))
  .on('error', m => logger.error(m))
  .on('info', m => logger.info(m))
  .on('DiscordAPIError', m => logger.error(m))
  .on('ready', () => {
    client.user.setActivity('/help | animafps.xyz');
    logger.info(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
    );
    logger.info(
      `Running on ${
        client.guilds.cache.array().length
      } servers: ${client.guilds.cache
        .array()
        .map(val => {
          return `${val.name}(${val.memberCount})`;
        })
        .join(', ')}`
    );
  })
  .on('disconnect', () => {
    logger.warn('Disconnected!');
  })
  .on('reconnecting', () => {
    logger.warn('Reconnecting...');
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    logger.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('commandBlocked', (msg, reason) => {
    logger.info(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
  })
  .on('commandPrefixChange', (guild, Prefix) => {
    logger.info(oneLine`
			Prefix ${Prefix === '' ? 'removed' : `changed to ${Prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    logger.info(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    logger.info(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  });

process.on('uncaughtException', error => logger.error(error));

client.registry
  .registerGroup('math', 'Math')
  .registerDefaultGroups()
  .registerDefaultTypes()
  .registerDefaultCommands({
    unknownCommand: false,
    help: false,
  })
  .registerTypesIn(path.join(__dirname, '/src/types'))
  .registerCommandsIn(path.join(__dirname, '/src/commands'));

client.registry.commands
  .filter(c => c.argsCollector)
  .forEach(c => (c.argsCollector.promptLimit = 0));

const Token = process.env.DISCORD_TOKEN || token;
client.login(Token);
