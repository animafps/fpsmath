/**
 * Object of games and units
 */
export const array: {
	[key: string]: { yaw?: number; aliases: string[]; film?: string }
} = {
	'Team Fortress 2': {
		yaw: 0.022,
		aliases: ['tf2', 'team-fortress', 'team-fortress-2'],
		film: '4ML3',
	},
	'3D Aim Trainer': {
		yaw: 0.0066,
		aliases: ['3daimtrainer', '3dat'],
		film: '16MF9',
	},
	Aimgods: { yaw: 0.0023331, aliases: ['aimgods'] },
	Source: {
		yaw: 0.022,
		aliases: ['source'],
		film: '4ML3',
	},
	'Counter Strike': {
		yaw: 0.022,
		aliases: ['cs', 'cs:go', 'csgo', 'counter-strike'],
		film: '4ML3',
	},
	Quake: { yaw: 0.022, aliases: ['quake'], film: '4ML3' },
	'Quake Champions': {
		aliases: ['qc', 'quake-champions'],
		film: '16ML9',
		yaw: 0.022,
	},
	'Apex Legends': {
		yaw: 0.022,
		aliases: ['apex-legends', 'apex'],
		film: '4ML3',
	},
	Valorant: { yaw: 0.07, aliases: ['valorant', 'val'], film: '16MS9' },
	Overwatch: {
		yaw: 0.0066,
		aliases: ['overwatch', 'ow'],
		film: '16MF9',
	},
	Fortnite: {
		yaw: 0.005555,
		aliases: ['fortnite', 'fn'],
		film: '16ML9',
	},
	'Fortnite config': {
		yaw: 2.222,
		aliases: ['fn-config', 'fortnite-config'],
		film: '16ML9',
	},
	Diabotical: {
		yaw: 0.022,
		aliases: ['diabotical', 'dbt'],
		film: 'vML',
	},
	'Rainbow Six: Siege': {
		yaw: 0.005729577951308232,
		aliases: ['r6', 'rainbow6', 'r6s', 'siege'],
		film: 'vML',
	},
	'Call of Duty': {
		yaw: 0.0066,
		aliases: ['cod', 'callofduty', 'call-of-duty', 'warzone', 'wz'],
		film: 'hML',
	},
	Battlefield: {
		yaw: 0.6771319397,
		aliases: ['battlefield', 'bf'],
		film: 'vML',
	},
	Destiny: {
		yaw: 0.0066,
		aliases: ['destiny', 'd2', 'destiny2'],
		film: '16ML9',
	},
	Reflex: {
		yaw: 0.005729577951308232087679815481411,
		aliases: ['reflex', 'reflex-arena'],
		film: '4ML3',
	},
	Krunker: {
		yaw: 0.13750954927425516,
		aliases: ['krunker'],
		film: 'vML',
	},
	Minecraft: {
		yaw: 0.2592,
		aliases: ['mc', 'minecraft'],
		film: 'hML',
	},
	Paladins: {
		aliases: ['paladins'],
		film: 'hML',
	},
	"PlayerUnknown's: Battleground": {
		aliases: ['pubg'],
		yaw: 2.49975,
		film: '16ML9',
	},
	'Totally Accurate Battlegrounds': {
		aliases: ['tabg'],
		yaw: 0.001280683,
		film: 'hML',
	},
	'Unreal Engine 4': {
		aliases: ['ue4', 'unreal', 'unreal-engine'],
		yaw: 0.07,
	},
	'Halo: Master Chief Collection': {
		yaw: 0.022222222222222223,
		aliases: ['halo', 'halo-mcc'],
		film: 'hML',
	},
}

/**
 * Gets a game from the array
 * @param game Game name or alias
 * @returns The object of the associated game
 */
export function get(game: string) {
	return map.get(game) ?? aliasesMap.get(game)
}

export const map = new Map<
	string,
	{ name: string; yaw?: number; aliases: string[]; film?: string }
>()
for (const x of Object.keys(array)) {
	map.set(x, { name: x, ...array[x] })
}
export const aliasesMap = new Map<
	string,
	{ name: string; yaw?: number; aliases: string[]; film?: string }
>()
for (const x of map) {
	x[1].aliases.forEach((val) => {
		aliasesMap.set(val, x[1])
	})
}

/**
 * Gets a specific object from a game object
 * @param game Game name
 * @param object Type of object
 * @returns The specific object requested or null if nothing found
 */
export function getObject(
	game: string,
	object: 'yaw' | 'aliases' | 'film' | 'name'
) {
	const value =
		map.get(game.toLowerCase()) ?? aliasesMap.get(game.toLowerCase())
	return value ? value[object] ?? null : null
}
