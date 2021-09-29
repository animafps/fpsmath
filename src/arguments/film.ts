import { Argument, PieceContext, ArgumentContext } from '@sapphire/framework';

export default class FilmArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'film' });
	}

	public run(parameter: string, context: ArgumentContext) {
		if (/^hm[lfi]$|vm[lfi]$|\d{1,2}m[lfi]\d{1,2}$/i.test(parameter)) {
			return this.ok(parameter);
		}
		return this.error({
			parameter,
			message: 'Incorrect FILM notation',
			identifier: 'badFILMNotation',
			context
		});
	}
}

declare module '@sapphire/framework' {
	interface ArgType {
		film: string;
	}
}
