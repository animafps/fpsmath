import { InfluxDB, QueryApi, WriteApi } from '@influxdata/influxdb-client'

export class AnalyticsData {
	public influx: InfluxDB | null = process.env.INFLUX_TOKEN
		? new InfluxDB({
				token: process.env.INFLUX_TOKEN,
				url: process.env.INFLUX_URL ?? '',
		  })
		: null

	public writeApi!: WriteApi
	public queryApi!: QueryApi

	public messageCount = 0

	public constructor() {
		this.writeApi = this.influx!.getWriteApi(
			process.env.INFLUX_ORG ?? '',
			process.env.INFLUX_BUCKET ?? '',
			's'
		)
		this.queryApi = this.influx!.getQueryApi(process.env.INFLUX_ORG ?? '')
	}
}
