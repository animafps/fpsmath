import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'

export class UserArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'yaw' })
	}

	public run(parameter: string, context: ArgumentContext) {
		if (isNaN(Number(parameter))) {
			if (this.container.client.games.get(parameter)?.yaw) {
				return this.ok(
					this.container.client.games.get(parameter)?.yaw as number
				)
			} else {
				return this.error({
					parameter,
					message: 'Game not supported or a valid yaw value.',
					identifier: 'yawNoSupport',
					context,
				})
			}
		}
		return this.ok(Number(parameter))
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		yaw: number
	}
}
