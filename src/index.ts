require("dotenv").config();
import { Client } from "discord.js-commando";
import * as winston from "winston";
import * as path from "path";
const oneLine = require("common-tags");
import * as dbots from "dbots";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "fpsmath" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

const client = new Client({
  owner: process.env.OWNERID,
  commandPrefix: process.env.PREFIX,
  invite: process.env.INVITE,
});

client
  .on("warn", (m) => logger.warn(m))
  .on("error", (m) => logger.error(m))
  .on("ready", () => {
    client.user?.setActivity("/help | animafps.xyz");
    logger.info(
      `Client ready; logged in as ${client.user?.username}#${client.user?.discriminator} (${client.user?.id})`
    );
    logger.info(`Running on ${client.guilds.cache.array().length} servers`);
    const poster = new dbots.Poster({
      client,
      apiKeys: {
        topgg: process.env.TOPGG_API_TOKEN || "",
        discordbotsgg: process.env.DISCORD_BOTSGG_TOKEN || "",
        botsfordiscord: process.env.BOTSFORDISCORD_TOKEN || "",
      },
      clientLibrary: "discord.js",
    });
    poster.addHandler("postFail", () => logger.debug("Api Post Fail"));
    poster.addHandler("postSuccess", () => logger.debug("Api Post Success"));
    poster.post("all");
    poster.startInterval();
  })
  .on("disconnect", () => {
    logger.warn("Disconnected!");
  })
  .on("commandPrefixChange", (guild, Prefix) => {
    logger.info(oneLine`
			Prefix ${Prefix === "" ? "removed" : `changed to ${Prefix || "the default"}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    logger.info(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    logger.info(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  });

process.on("uncaughtException", (error) => logger.error(error));

client.registry
  .registerGroup("math", "Math")
  .registerDefaultGroups()
  .registerDefaultTypes()
  .registerDefaultCommands({
    unknownCommand: false,
    help: false,
  })
  .registerTypesIn(path.join(__dirname, "./types"))
  .registerCommandsIn(path.join(__dirname, "./commands"));

client.registry.commands
  .filter((c) => !c.argsCollector === false)
  .forEach((c) => (c.argsCollector.promptLimit = 0));

const Token = process.env.DISCORD_TOKEN;
client.login(Token);
