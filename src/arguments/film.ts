import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework'
import { getObject } from '../helpers/array'

export class UserArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'film' })
	}

	public run(parameter: string, context: ArgumentContext) {
		if (
			/^HM[LFI]$|^VM[LFI]$|^\d{1,2}M[LFI]\d{1,2}$/.test(
				parameter.toUpperCase()
			)
		) {
			return this.ok(parameter.toUpperCase())
		} else if (getObject(parameter, 'film')) {
			return this.ok(getObject(parameter, 'film') as string)
		}
		return this.error({
			parameter,
			message: 'Incorrect FILM notation',
			identifier: 'badFILMNotation',
			context,
		})
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		film: string
	}
}
