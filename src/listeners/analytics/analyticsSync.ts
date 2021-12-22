import { AnalyticsListener } from '#lib/structures'
import { Actions, Points, Tags } from '#lib/types/AnalyticsSchema'
import { Events } from '#lib/types/Enums'
import { Point } from '@influxdata/influxdb-client'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AnalyticsListener.Options>({ event: Events.AnalyticsSync })
export class UserAnalyticsEvent extends AnalyticsListener {
	public async run(guilds: number, users: number) {
		this.writePoints([this.syncGuilds(guilds), this.syncUsers(users)])

		return this.container.client.analytics!.writeApi.flush()
	}

	private syncGuilds(value: number) {
		return (
			new Point(Points.Guilds)
				.tag(Tags.Action, Actions.Sync)
				// TODO: Adjust for traditional sharding
				.intField('value', value)
		)
	}

	private syncUsers(value: number) {
		return (
			new Point(Points.Users)
				.tag(Tags.Action, Actions.Sync)
				// TODO: Adjust for traditional sharding
				.intField('value', value)
		)
	}
}
