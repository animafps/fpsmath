import { SapphireClient } from '@sapphire/framework'
import type { ClientOptions } from 'discord.js'
import { AnalyticsData } from './structures/AnalyticsData'

export class FPSMathClient extends SapphireClient {
	public readonly analytics: AnalyticsData | null

	public constructor(options: ClientOptions) {
		super(options)
		this.analytics = process.env.INFLUX_TOKEN ? new AnalyticsData() : null
	}
}

declare module '@sapphire/framework' {
	interface SapphireClient {
		analytics: AnalyticsData | null
	}
}
