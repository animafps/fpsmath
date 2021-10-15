import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'

export default class GameArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'aspectRatio' })
	}

	public run(parameter: string, context: ArgumentContext) {
		if (/\d{1,4}:\d{1,4}/.test(parameter)) {
			const split = parameter.split(':')
			return this.ok(Number(split[0]) / Number(split[1]))
		}
		return this.error({
			parameter,
			message: 'Not valid aspect ratio',
			identifier: 'aspectRatioNoSupport',
			context,
		})
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		aspectRatio: number
	}
}
