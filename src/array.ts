"use strict";

const array = [
  { name: "Aimgods", yaw: 0.0023331, aliases: ["aimgods"] },
  {
    name: "Source",
    yaw: 0.022,
    fovt: 4 / 3,
    aliases: ["source"],
    afovt: "4ML3",
  },
  {
    name: "Counter Strike",
    yaw: 0.022,
    fovt: 4 / 3,
    aliases: ["cs", "cs:go", "csgo", "counter-strike"],
    afovt: "4ML3",
  },
  { name: "Quake", yaw: 0.022, fovt: 4 / 3, aliases: ["quake"], afovt: "4ML3" },
  {
    name: "Quake Champions",
    fovt: 16 / 9,
    aliases: ["qc", "quake-champions"],
    afovt: "16ML9",
    yaw: 0.022,
  },
  {
    name: "Apex Legends",
    yaw: 0.022,
    fovt: 4 / 3,
    aliases: ["apex-legends", "apex"],
    afovt: "4ML3",
  },
  { name: "Valorant", yaw: 0.07, fovt: 16 / 9, aliases: ["valorant", "val"] },
  {
    name: "Overwatch",
    yaw: 0.0066,
    fovt: 16 / 9,
    aliases: ["overwatch", "ow"],
    afovt: "16MF9",
  },
  {
    name: "Fortnite",
    yaw: 0.005555,
    fovt: 16 / 9,
    aliases: ["fortnite", "fn"],
    afovt: "16MF9",
  },
  {
    name: "Fortnite config",
    yaw: 2.222,
    fovt: 16 / 9,
    aliases: ["fn-config", "fortnite-config"],
    afovt: "16MF9",
  },
  {
    name: "Diabotical",
    yaw: 0.022,
    fovt: 1,
    aliases: ["diabotical", "dbt"],
    afovt: "vML",
  },
  {
    name: "Rainbow Six: Siege",
    yaw: 0.005729577951308232,
    fovt: 1,
    aliases: ["r6", "rainbow6", "r6s"],
    afovt: "vML",
  },
  {
    name: "Call of Duty",
    yaw: 0.0066,
    fovt: 16 / 9,
    aliases: ["cod", "callofduty", "call-of-duty", "warzone", "wz"],
    afovt: "16ML9",
  },
  {
    name: "Battlefield",
    yaw: 2.291831180523293,
    fovt: 1,
    aliases: ["battlefield", "bf"],
    afovt: "vML",
  },
  {
    name: "Destiny",
    yaw: 0.0066,
    fovt: 16 / 9,
    aliases: ["destiny", "d2", "destiny2"],
    afovt: "16ML9",
  },
  {
    name: "Reflex",
    yaw: 0.005729577951308232087679815481411,
    fovt: 4 / 3,
    aliases: ["reflex", "reflex-arena"],
    afovt: "4ML3",
  },
  {
    name: "Krunker",
    yaw: 0.13750954927425516,
    fovt: 1,
    aliases: ["krunker"],
    afovt: "vML",
  },
  {
    name: "Minecraft",
    yaw: 0.2592,
    aliases: ["mc", "minecraft"],
    afovt: "hML",
  },
  {
    name: "Palidins",
    aliases: ["palidins"],
    afovt: "hML",
  },
];
array.sort();

export function getObject(args: string, object: string | number): string {
  const isYaw = array.some((elem) =>
    elem.aliases.some((currentValue) => currentValue === args)
  );
  if (!isYaw) {
    return args;
  } else {
    let outcome: string = "";
    array.forEach((item: { [index: string]: any }) => {
      item.aliases.forEach((val: string) => {
        if (val === args) {
          outcome = item[object];
        }
      });
    });
    return outcome;
  }
}

export function games() {
  let result = "";
  array.forEach((item) => {
    result += `${item.name}: (${item.aliases.join(", ")})\n`;
  });
  return result;
}
