const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const { ownerID, token, prefix, invite } = require('./src/config.json');
const database = require('better-sqlite3');
const db = new database('settings.db');

const client = new commando.Client({
  owner: process.env.OWNERID || ownerID,
  commandPrefix: process.env.PREFIX || prefix,
  invite: process.env.INVITE || invite,
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    client.user.setActivity('/help | animafps.github.io');
    console.log(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
    );
    console.log(
      `Running on servers: ${client.guilds.cache
        .array()
        .map(val => {
          return `${val.name}(${val.memberCount})`;
        })
        .join(', ')}`
    );
  })
  .on('disconnect', () => {
    console.warn('Disconnected!');
  })
  .on('reconnecting', () => {
    console.warn('Reconnecting...');
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
  })
  .on('commandPrefixChange', (guild, Prefix) => {
    console.log(oneLine`
			Prefix ${Prefix === '' ? 'removed' : `changed to ${Prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  });

client.setProvider(new commando.SyncSQLiteProvider(db));

client.registry
  .registerGroup('math', 'Math')
  .registerDefaults()
  .registerTypesIn(path.join(__dirname, '/src/types'))
  .registerCommandsIn(path.join(__dirname, '/src/commands'));

client.registry.commands
  .filter(c => c.argsCollector)
  .forEach(c => (c.argsCollector.promptLimit = 0));

const Token = process.env.DISCORD_TOKEN || token;
client.login(Token);
