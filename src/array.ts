interface Array {
  [index: string]: {
    yaw?: number;
    aliases: string[];
    fovt?: number;
    afovt?: string;
  };
}
const array: Array = {
  Aimgods: { yaw: 0.0023331, aliases: ["aimgods"] },
  Source: {
    yaw: 0.022,
    aliases: ["source"],
    afovt: "4ML3",
  },
  "Counter Strike": {
    yaw: 0.022,
    aliases: ["cs", "cs:go", "csgo", "counter-strike"],
    afovt: "4ML3",
  },
  Quake: { yaw: 0.022, aliases: ["quake"], afovt: "4ML3" },
  "Quake Champions": {
    aliases: ["qc", "quake-champions"],
    afovt: "16ML9",
    yaw: 0.022,
    afovt: "hML",
  },
  "Apex Legends": {
    yaw: 0.022,
    aliases: ["apex-legends", "apex"],
    afovt: "4ML3",
  },
  Valorant: { yaw: 0.07, aliases: ["valorant", "val"] },
  Overwatch: {
    yaw: 0.0066,
    aliases: ["overwatch", "ow"],
    afovt: "16MF9",
  },
  Fortnite: {
    yaw: 0.005555,
    aliases: ["fortnite", "fn"],
    afovt: "16MF9",
  },
  "Fortnite config": {
    yaw: 2.222,
    aliases: ["fn-config", "fortnite-config"],
    afovt: "16MF9",
  },
  Diabotical: {
    yaw: 0.022,
    aliases: ["diabotical", "dbt"],
    afovt: "vML",
  },
  "Rainbow Six: Siege": {
    yaw: 0.005729577951308232,
    aliases: ["r6", "rainbow6", "r6s"],
    afovt: "vML",
  },
  "Call of Duty": {
    yaw: 0.0066,
    aliases: ["cod", "callofduty", "call-of-duty", "warzone", "wz"],
    afovt: "hML",
  },
  Battlefield: {
    yaw: 2.291831180523293,
    aliases: ["battlefield", "bf"],
    afovt: "vML",
  },
  Destiny: {
    yaw: 0.0066,
    aliases: ["destiny", "d2", "destiny2"],
    afovt: "16ML9",
  },
  Reflex: {
    yaw: 0.005729577951308232087679815481411,
    aliases: ["reflex", "reflex-arena"],
    afovt: "4ML3",
  },
  Krunker: {
    yaw: 0.13750954927425516,
    aliases: ["krunker"],
    afovt: "vML",
  },
  Minecraft: {
    yaw: 0.2592,
    aliases: ["mc", "minecraft"],
    afovt: "hML",
  },
  Palidins: {
    aliases: ["palidins"],
    afovt: "hML",
  },
  "PlayerUnknown's: Battleground": {
    aliases: ["pubg"],
    yaw: 2.49975,
    afovt: "16ML9",
  },
  "Totally Accurate Battlegrounds": {
    aliases: ["tabg"],
    yaw: 0.001280683,
    afovt: "hML",
  },
};

export function getObject(
  game: string,
  object: string
): string | number | string[] | null {
  let output: string | number | string[] = "Error";
  for (const x in array) {
    array[x].aliases.forEach((element) => {
      if (element === game.toLowerCase()) {
        output = (array[x] as { [key: string]: number | string | string[] })[
          object
        ];
      }
    });
    if (output !== "Error") {
      return output;
    }
  }
  return null;
}

export function games(): string {
  let result = "";
  for (const x in array) {
    result += `${x}: \`${array[x].aliases.join(", ")}\`\n`;
  }
  return result;
}
