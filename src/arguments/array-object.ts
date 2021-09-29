import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework';

export default class GameArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'gameObject' });
	}

	public run(parameter: string, context: ArgumentContext) {
		if (parameter.toLowerCase() === 'yaw' || 'film' || 'aliases') {
			return this.ok(parameter);
		}
		return this.error({
			parameter,
			message: 'Game not supported.',
			identifier: 'gameNoSupport',
			context
		});
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		arrayObject: 'yaw' | 'film' | 'aliases';
	}
}
