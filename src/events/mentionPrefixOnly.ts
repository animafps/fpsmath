import { Event, Events } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserEvent extends Event<Events.MentionPrefixOnly> {
	public async run(message: Message) {
		this.context.client.fetchPrefix(message);
		return message.channel.send(
			this.context.client.fetchPrefix(message)
				? `My prefix in this guild is: \`${this.context.client.fetchPrefix(message)}\``
				: 'You do not need a prefix in DMs.'
		);
	}
}
