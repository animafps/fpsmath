import { Listener, Store, ListenerOptions, PieceContext, Events } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
const dev = process.env.NODE_ENV !== 'production';

export class UserEvent extends Listener<typeof Events.ClientReady> {
	private readonly style = dev ? yellow : blue;

	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true
		});
	}

	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line} ${pad}${blc(`${process.env.npm_package_name}@${process.env.npm_package_version || '1.0.0'}`)}
${line} ${pad}[${success}] Gateway (${this.container.client.user?.username}#${this.container.client.user?.discriminator})
${line} ${pad}Severs: ${this.container.client.guilds.cache.size}
${line} ${pad}Serving: ${this.container.client.users.cache.size} people
${line}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
