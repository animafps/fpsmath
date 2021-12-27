import { MessageEmbed, CommandInteraction, Message, version } from 'discord.js'
import { Command, CommandOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { roundNumber } from '@sapphire/utilities'
import { uptime, cpus, CpuInfo } from 'node:os'
import { time, TimestampStyles } from '@discordjs/builders'
import { Time } from '@sapphire/time-utilities'
import { PermissionFlagsBits } from 'discord-api-types/v9'

@ApplyOptions<CommandOptions>({
	aliases: ['sts'],
	description: 'Displays some statistics related to the bot',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-sts

	🖇️ **| Aliases**: \`sts\`
	`,
	requiredClientPermissions: [PermissionFlagsBits.EmbedLinks],
	chatInputCommand: {
		register: true,
	},
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.reply({ embeds: [this.buildEmbed()] })
	}

	public chatInputRun(interaction: CommandInteraction) {
		return interaction.reply({ embeds: [this.buildEmbed()] })
	}

	private buildEmbed() {
		const fields = {
			stats: this.generalStatistics,
			uptime: this.uptimeStatistics,
			usage: this.usageStatistics,
		}

		return new MessageEmbed()
			.setColor('#0099ff')
			.addField('Stats', fields.stats)
			.addField('Uptime', fields.uptime)
			.addField('Server Usage', fields.usage)
	}

	private get generalStatistics() {
		const { client } = this.container
		return `**Guilds**: ${
			client.guilds.cache.size
		}\n**Users**: ${client.guilds.cache.reduce(
			(acc, val) => acc + (val.memberCount ?? 0),
			0
		)}\n**Channels**: ${client.channels.cache.size}\n**NodeJs**: ${
			process.version
		}\n**Discord.js**: v${version}`
	}

	private get uptimeStatistics() {
		const now = Date.now()
		const nowSeconds = roundNumber(now / 1000)
		return `**Host**: ${time(
			roundNumber(nowSeconds - uptime()),
			TimestampStyles.RelativeTime
		)}\n**Client**: ${time(
			seconds.fromMilliseconds(now - this.container.client.uptime!),
			TimestampStyles.RelativeTime
		)}\n**Total**: ${time(
			roundNumber(nowSeconds - process.uptime()),
			TimestampStyles.RelativeTime
		)}
		`
	}

	private get usageStatistics() {
		const usage = process.memoryUsage()
		return `**CPU Load**: ${cpus()
			.map(UserCommand.formatCpuInfo.bind(null))
			.join(' | ')}\n**Heap**: ${(usage.heapUsed / 1048576).toFixed(
			2
		)}MB (Total: ${(usage.heapTotal / 1048576).toFixed(2)}MB)
		`
	}

	private static formatCpuInfo({ times }: CpuInfo) {
		return `${
			roundNumber(
				((times.user + times.nice + times.sys + times.irq) /
					times.idle) *
					10000
			) / 100
		}%`
	}
}

/**
 * Converts a number of seconds to milliseconds.
 * @param seconds The amount of seconds
 * @returns The amount of milliseconds `seconds` equals to.
 */
function seconds(seconds: number) {
	return seconds * Time.Second
}

/**
 * Converts a number of milliseconds to seconds.
 * @param milliseconds The amount of milliseconds
 * @returns The amount of seconds `milliseconds` equals to.
 */
seconds.fromMilliseconds = (milliseconds: number): number => {
	return roundNumber(milliseconds / Time.Second)
}
