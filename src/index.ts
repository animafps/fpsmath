import * as dotenv from "dotenv";
import { AkairoClient, CommandHandler } from "discord-akairo";
import * as winston from "winston";
import { Poster } from "dbots";

dotenv.config();
const Token = process.env.DISCORD_TOKEN;

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
          (info: winston.Logform.TransformableInfo) =>
            `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

class Client extends AkairoClient {
  commandHandler: CommandHandler;
  constructor() {
    super(
      {
        ownerID: process.env.OWNER_ID,
      },
      {}
    );

    this.commandHandler = new CommandHandler(this, {
      directory: __dirname.includes("/dist/")
        ? "./dist/commands/"
        : "./src/commands/",
      commandUtil: true,
      handleEdits: true,
      automateCategories: true,
      commandUtilLifetime: 30000,
      prefix: "/",
      allowMention: true,
      aliasReplacement: /-/g,
    });
    this.commandHandler.loadAll();
  }
}

const client = new Client();

client
  .on("warn", (m) => logger.warn(m))
  .on("error", (m) => logger.error(m))
  .on("ready", () => {
    client.user?.setActivity("/help | fpsmath.animafps.xyz");
    logger.info(
      `Client ready; logged in as ${client.user?.username}#${client.user?.discriminator} (${client.user?.id})`
    );
    logger.info(`Running on ${client.guilds.cache.array().length} servers`);
    const poster = new Poster({
      client,
      apiKeys: {
        topgg: process.env.TOPGG_API_TOKEN || "",
        discordbotsgg: process.env.DISCORD_BOTSGG_TOKEN || "",
        botsfordiscord: process.env.BOTSFORDISCORD_TOKEN || "",
      },
      clientLibrary: "discord.js",
    });
    poster.addHandler("postSuccess", () => logger.debug("Api Post Success"));    
    poster.post("all");
    poster.startInterval();
  })
  .on("disconnect", () => {
    logger.warn("Disconnected!");
  });

process.on("uncaughtException", (error) => logger.error(error));
process.on("unhandledRejection", (m) => logger.error(m));

client.login(Token);
