import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'
import { parseAspect } from '../helpers/fovHelper'

export default class GameArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'aspectRatio' })
	}

	public run(parameter: string, context: ArgumentContext) {
		const parsed = parseAspect(parameter)
		if (parsed) {
			return this.ok(parsed)
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
