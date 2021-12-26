import { Collection } from 'discord.js'
import type { filmNotation } from 'fov-utilities'
import array from '../array.json'

export class GameCollection extends Collection<string, arrayType> {
	private aliases: Collection<string, arrayType>
	constructor() {
		super()
		for (const x of Object.keys(array)) {
			super.set(x, {
				name: x,
				...(array as Record<string, Omit<arrayType, 'name'>>)[x],
			})
		}

		this.aliases = new Collection()
		for (const x of this) {
			x[1].aliases.forEach((val) => {
				this.aliases.set(val, x[1])
			})
		}
	}

	public override get(key: string) {
		return super.get(key) ?? this.aliases.get(key)
	}
}

interface arrayType {
	film?: filmNotation
	yaw?: number
	aliases: string[]
	name: string
}
