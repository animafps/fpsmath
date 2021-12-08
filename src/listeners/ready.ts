import {
	Listener,
	Store,
	ListenerOptions,
	PieceContext,
	Events,
} from '@sapphire/framework'
const dev = process.env.NODE_ENV !== 'production'

export class UserListener extends Listener<typeof Events.ClientReady> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true,
		})
	}

	public run() {
		this.printBanner()
		this.printStoreDebugInformation()
	}

	private printBanner() {
		// Offset Pad
		const pad = ' '.repeat(7)

		console.log(
			String.raw`${pad}fpsmath
${pad}[+] Gateway (${this.container.client.user?.tag})
${pad}Severs: ${this.container.client.guilds.cache.size}
${pad}Users: ${this.container.client.guilds.cache.reduce(
				(acc, val) => acc + (val.memberCount ?? 0),
				0
			)}
${pad}Shards: ${this.container.client.shard?.count ?? 0}${
				dev ? `\n${pad}</> DEVELOPMENT MODE` : ''
			}`
		)
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container
		const stores = [...client.stores.values()]
		const last = stores.pop()

		for (const store of stores) logger.info(this.styleStore(store, false))
		if (last) logger.info(this.styleStore(last, true))
	}

	private styleStore(store: Store<any>, last: boolean) {
		return `${last ? '└─' : '├─'} Loaded ${store.size
			.toString()
			.padEnd(3, ' ')} ${store.name}.`
	}
}
