import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'

export class UserArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'gameObject' })
	}

	public run(parameter: string, context: ArgumentContext) {
		if (
			parameter.toLowerCase() === 'yaw' ||
			parameter.toLowerCase() === 'film' ||
			parameter.toLowerCase() === 'alias' ||
			parameter.toLowerCase() === 'name'
		) {
			return this.ok(parameter)
		}
		return this.error({
			parameter,
			message: '',
			identifier: 'gameObjectNoSupport',
			context,
		})
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		arrayObject: 'yaw' | 'film' | 'aliases' | 'name'
	}
}
