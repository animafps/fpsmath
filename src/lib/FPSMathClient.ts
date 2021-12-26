import { container, SapphireClient } from '@sapphire/framework'
import type { ClientOptions } from 'discord.js'
import { AnalyticsData } from './structures/AnalyticsData'
import { GameCollection } from './structures/GameCollection'

export class FPSMathClient extends SapphireClient {
	public readonly analytics: AnalyticsData | null

	public games: GameCollection

	public constructor(options: ClientOptions) {
		super(options)
		this.analytics = process.env.INFLUX_TOKEN ? new AnalyticsData() : null
		this.games = new GameCollection()
		container.games = this.games
	}
}

declare module '@sapphire/framework' {
	interface SapphireClient {
		analytics: AnalyticsData | null
		games: GameCollection
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		games: GameCollection
		analytics: AnalyticsData | null
	}
}
