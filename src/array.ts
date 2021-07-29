interface Array {
  [index: string]: {
    yaw?: number;
    aliases: string[];
    fovt?: number;
    afovt?: string;
  };
}
const array: Array = {
  "3D Aim Trainer": {
    yaw: 0.0066,
    aliases: ["3daimtrainer", "3dat"],
    afovt: "16MF9",
  },
  Aimgods: { yaw: 0.0023331, aliases: ["aimgods"] },
  "Apex Legends": {
    yaw: 0.022,
    aliases: ["apex-legends", "apex"],
    afovt: "4ML3",
  },
  "Call of Duty": {
    yaw: 0.0066,
    aliases: ["cod", "callofduty", "call-of-duty", "warzone", "wz"],
    afovt: "hML",
  },
  "Counter Strike": {
    yaw: 0.022,
    aliases: ["cs", "cs:go", "csgo", "counter-strike"],
    afovt: "4ML3",
  },
  Battlefield: {
    yaw: 0.6771319397,
    aliases: ["battlefield", "bf"],
    afovt: "vML",
  },
  Destiny: {
    yaw: 0.0066,
    aliases: ["destiny", "d2", "destiny2"],
    afovt: "16ML9",
  },
  Diabotical: {
    yaw: 0.022,
    aliases: ["diabotical", "dbt"],
    afovt: "vML",
  },
  Fortnite: {
    yaw: 0.005555,
    aliases: ["fortnite", "fn"],
    afovt: "16ML9",
  },
  "Fortnite config": {
    yaw: 2.222,
    aliases: ["fn-config", "fortnite-config"],
    afovt: "16ML9",
  },
  "Halo: Master Chief Collection": {
    yaw: 0.022222222222222223,
    aliases: ["halo", "halo-mcc"],
    afovt: "hML",
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
  Overwatch: {
    yaw: 0.0066,
    aliases: ["overwatch", "ow"],
    afovt: "16MF9",
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
  Quake: { yaw: 0.022, aliases: ["quake"], afovt: "4ML3" },
  "Quake Champions": {
    aliases: ["qc", "quake-champions"],
    afovt: "16ML9",
    yaw: 0.022,
  },
  "Rainbow Six: Siege": {
    yaw: 0.005729577951308232,
    aliases: ["r6", "rainbow6", "r6s", "siege"],
    afovt: "vML",
  },
  Reflex: {
    yaw: 0.005729577951308232087679815481411,
    aliases: ["reflex", "reflex-arena"],
    afovt: "4ML3",
  },
  Source: {
    yaw: 0.022,
    aliases: ["source"],
    afovt: "4ML3",
  },
  "Totally Accurate Battlegrounds": {
    aliases: ["tabg"],
    yaw: 0.001280683,
    afovt: "hML",
  },
  "Unreal Engine 4": {
    aliases: ["ue4", "unreal", "unreal-engine"],
    yaw: 0.07,
  },
  Valorant: { yaw: 0.07, aliases: ["valorant", "val"] },
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
