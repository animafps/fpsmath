const array = [
  { name: 'Aimgods', yaw: 0.0023331, aliases: ['aimgods'] },
  { name: 'Source', yaw: 0.022, fovt: 0.75, aliases: ['source'] },
  {
    name: 'Counter Strike',
    yaw: 0.022,
    fovt: 0.75,
    aliases: ['cs', 'cs:go', 'csgo', 'counter-strike'],
  },
  { name: 'Quake', yaw: 0.022, fovt: 0.75, aliases: ['quake'] },
  {
    name: 'Apex Legends',
    yaw: 0.022,
    fovt: 0.75,
    aliases: ['apex-legends', 'apex'],
  },
  { name: 'Valorant', yaw: 0.07, fovt: 0.5625, aliases: ['valorant', 'val'] },
  {
    name: 'Overwatch',
    yaw: 0.0066,
    fovt: 0.5625,
    aliases: ['overwatch', 'ow'],
  },
  { name: 'Fortnite', yaw: 0.005555, fovt: 1, aliases: ['fornite', 'fn'] },
  {
    name: 'Fortnite config',
    yaw: 2.222,
    fovt: 1,
    aliases: ['fn-config', 'fornite-config'],
  },
  {
    name: 'Diabotical',
    yaw: 0.022000000000000002,
    fovt: 1,
    aliases: ['diabotical', 'dbt'],
  },
  {
    name: 'Rainbow Six: Siege',
    yaw: 0.005729577951308232,
    fovt: 1,
    aliases: ['r6', 'rainbow6', 'r6s'],
  },
  {
    name: 'Call of Duty',
    yaw: 0.0066,
    fovt: 0.5625,
    aliases: ['cod', 'callofduty', 'call-of-duty', 'warzone', 'wz'],
  },
  {
    name: 'Battlefield',
    yaw: 2.291831180523293,
    fovt: 1,
    aliases: ['battlefield', 'bf'],
  },
  {
    name: 'Destiny',
    yaw: 0.0066,
    fovt: 0.5625,
    aliases: ['destiny', 'd2', 'destiny2'],
  },
];

array.sort();

function getObject(args, object) {
  const isYaw = array.some(elem =>
    elem.aliases.some(currentValue => currentValue === args)
  );
  if (!isYaw) {
    return args;
  } else {
    let outcome;
    array.forEach(item => {
      item.aliases.forEach(val => {
        if (val === args) {
          outcome = item[object]
        }
      });
    });
    return outcome;
  }
}

function gameNames() {
  let result = '';
  array.forEach(item => {
    result += `${item.name}: (${item.aliases.join(', ')})\n`;
  });
  return result;
}

module.exports = {
  games: gameNames,
  getObject: getObject,
};
