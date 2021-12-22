import { Events as SapphireEvents } from '@sapphire/framework'

export const CustomEvents = {
	AnalyticsSync: 'analyticsSync',
	CommandUsageAnalytics: 'commandUsageAnalytics',
}
export const Events = { ...SapphireEvents, ...CustomEvents }
