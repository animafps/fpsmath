import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'

export class UserArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'game' })
	}

	public run(parameter: string, context: ArgumentContext) {
		if (this.container.games.get(parameter)?.name) {
			return this.ok(parameter)
		}
		return this.error({
			parameter,
			message: 'Game not supported.',
			identifier: 'gameNoSupport',
			context,
		})
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		game: string
	}
}
