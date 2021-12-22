import {
	Listener,
	Store,
	ListenerOptions,
	PieceContext,
} from '@sapphire/framework'
import { Events } from '#lib/types/Enums'
const dev = process.env.NODE_ENV !== 'production'

export class UserListener extends Listener<typeof Events.ClientReady> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true,
		})
	}

	public run() {
		try {
			this.initAnalytics()
		} catch (error) {
			this.container.logger.fatal(error)
		}
		this.printBanner()
		this.printStoreDebugInformation()
	}

	private async initAnalytics() {
		if (process.env.INFLUX_TOKEN) {
			const { client } = this.container
			client.emit(
				Events.AnalyticsSync,
				client.guilds.cache.size,
				client.guilds.cache.reduce(
					(acc, val) => acc + (val.memberCount ?? 0),
					0
				)
			)
		}
	}

	private printBanner() {
		// Offset Pad
		const pad = ' '.repeat(7)

		console.log(
			String.raw`${pad}fpsmath
${pad}[+] Gateway (${this.container.client.user?.tag})
${pad}[${this.container.client.analytics ? '+' : '-'}] Analytics${
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
