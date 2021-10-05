import {
	ArgumentError,
	CommandErrorPayload,
	Events,
	Listener,
} from '@sapphire/framework'

export default class UserListener extends Listener<typeof Events.CommandError> {
	public run(error: ArgumentError, { message, args }: CommandErrorPayload) {
		switch (error.identifier) {
			case 'argsMissing':
				void message.reply(
					`You need to write another parameter!
					> **Tip**: You can do \`${args.commandContext.prefix}help ${args.command.name}\` to find out how to use this command.`
				)
				break

			case 'gameNoSupport':
				void message.reply(
					`Game: \`${error.parameter}\` not supported.
					> **Tip**: You can do \`${args.commandContext.prefix}games\` to see all the supported games.`
				)
				break

			case 'floatError':
				void message.reply(
					`\`${error.parameter}\` is not a valid decimal.`
				)
				break

			default:
				void message.reply(`${error.identifier}: ${error.message}`)
				break
		}
	}
}
