import {
	ArgumentError,
	MessageCommandErrorPayload,
	Events,
	Listener,
} from '@sapphire/framework'
import { captureException } from '@sentry/node'

export class UserListener extends Listener<typeof Events.MessageCommandError> {
	public run(
		error: ArgumentError,
		{ message, context, command }: MessageCommandErrorPayload
	) {
		switch (error.identifier) {
			case 'argsMissing':
				void message.reply(
					`You need to write another parameter!
					> **Tip**: You can do \`${context.prefix}help ${command.name}\` to find out how to use this command.`
				)
				break

			case 'gameNoSupport':
				void message.reply(
					`Game: \`${error.parameter}\` not supported.
					> **Tip**: You can do \`${context.prefix}games\` to see all the supported games.`
				)
				break

			case 'floatError':
				void message.reply(
					`\`${error.parameter}\` is not a valid decimal.
                    > **Tip**: You can do \`${context.prefix}help ${command.name}\` to find out how to use this command.`
				)
				break

			case 'gameObjectNoSupport':
				void message.reply(
					`\`${error.parameter}\` is not a valid object type. Must be either 'film', 'yaw', 'alias' or 'name'`
				)
				break

			case 'badFILMNotation':
				void message.reply(
					`\`${error.parameter}\` is not valid FILM notation.`
				)
				break

			case 'yawNoSupport':
				void message.reply(
					`\`${error.parameter}\` is not a valid decimal or supported game
                    > **Tip**: You can do \`${context.prefix}games\` to see all the supported games.`
				)
				break

			default:
				void message.reply(`${error.identifier}: ${error.message}`)
				captureException(error, { tags: { command: command.name } })
				break
		}
	}
}
