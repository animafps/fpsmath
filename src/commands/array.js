var array = [
    {name:'aimgods', yaw:0.0023331}, //horizontal no ratio
    {name:'source', yaw:0.022, fovt: 0.75},
    {name:'csgo', yaw:0.022, fovt: 0.75},{name:'cs', yaw:0.022, fovt:0.75},
    {name:'quake', yaw:0.022, fovt: 0.75},
    {name:'apex', yaw:0.022, fovt: 0.75},
    {name:'val', yaw:0.07, fovt:0.5625},{name:'valorant', yaw:0.07, fovt:0.5625},
    {name:'ow', yaw:0.0066, fovt:0.5625},{name:'overwatch', yaw:0.0066, fovt:0.5625},
    {name:'fn', yaw:0.005555, fovt:1},{name:'fortnite', yaw:0.005555, fovt:1}, 
    {name:'fn-config', yaw:2.222, fovt:1}, {name:'fortnite-config', yaw:2.222, fovt:1},
    {name:'dbt', yaw:0.022000000000000002, fovt:1},
    {name:'r6', yaw:0.005729577951308232, fovt:1},
    {name:'cod', yaw:0.0066, fovt:0.5625},
    {name:'battlefield', yaw:2.291831180523293, fovt:1},
    {name:'destiny', yaw:0.0066, fovt:0.5625}
];

function getYaw(args) {
    var isYaw = array.some(elem => elem.name === args);
    if (!isYaw){
        return args;
    } else {
        for (var i=0; i < array.length; i++){
            if (args == array[i].name) {
                return array[i].yaw;
            }
        }
    }
    
}

function gameNames() {
    var gamenames = '';
    for (var x=0; x < array.length-1; x++){
        gamenames += array[x].name + ', ';
    }
    gamenames += array[array.length-1].name;
    return gamenames
}

function getArray() {
    return array;
}
module.exports = {
    getArray: getArray,
    games: gameNames,
    getYaw: getYaw
};

