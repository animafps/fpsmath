# FPSMath

[![FPSMath](https://socialify.git.ci/animafps/fpsmath?description=1&font=Inter&language=1&logo=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F792712521546465301%2Fa8176886ccd814f17b4c5a98b62e185a.png%3Fsize%3D256&owner=1&theme=Dark)](https://github.com/AnimaFPS/FPSMath)

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnimaFPS/FPSMath?style=flat-square)](https://github.com/AnimaFPS/FPSMath/releases)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/AnimaFPS/FPSMath/CI?logo=github&style=flat-square)](https://github.com/AnimaFPS/FPSMath/Actions)

[![Discord Bots](https://top.gg/api/widget/792712521546465301.svg)](https://top.gg/bot/792712521546465301)

## Installing

[Install This Bot on Your Server](https://top.gg/bot/792712521546465301/invite) or DM `FPS Math#9838` with the commands outside of a server

or from source [Instructions](/docs/CONTRIBUTING.MD)

## Usage

\<required\|alternative option\> \[optional\] **exact argument**

### Main Commands

| Command  | Arguments                                                                   | Description                                                                                                     | Example                   |
| -------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- |
| /cm      | \<sens\> \<game\|yaw\> \<cpi\>                                              | Converts Sensitivity to cm/rev                                                                                  | `/cm 6 ow 1600`           |
| /deg     | \<sens\> \<game\|yaw\> \<cpi\>                                              | Converts Sensitivity to deg/mm                                                                                  | `/deg 1.9 0.022 800`      |
| /mpi     | \<sens\> \<game\|yaw\> \<cpi>                                               | Converts Sensitivity to MPI                                                                                     | `/MPI 0.23327 val 1600`   |
| /inch    | \<sens\> \<game\|yaw\> \<cpi\>                                              | Converts Sensitivity to inch/rev                                                                                | `/inch 8 fn 1200`         |
| /convert | \<sens\> \<input game\|yaw\> \<output game\|yaw\>                           | Converts Different Sensitivities from one game to another                                                       | `/convert 3 ow 0.022`     |
| /fov     | \<fov> \<fov> \<game\|FILM notation\> \<aspect ratio\>                      | Finds the true vertical and horizontal FOVs for certain aspect ratio and game/FOV scaling method(FILM notation) | `fov 90 source 16:9`      |
| /focal   | \<sens\> \<old fov\> \<new fov\>                                            | Focal Length Scales a desired sens between 2 fov values of the same type                                        | `/focal 3 90 100`         |
| /sens    | \<cm/rev\> \<game\|yaw\> \<cpi\> \[**-cm**\|**-deg**\|**-mpi**\|**-inch**\] | Converts cm/rev\|deg/mm\|MPI\|inch/rev to a game sensitivity default cm/rev                                     | `/sens 28 quake 1600 -cm` |

### Utility Commands

| Command    | Arguments                                | Description                                                                             | Example             |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------------------- | ------------------- |
| /prefix    | \<prefix\|**none**\|**default**\>        | Shows or sets the command prefix.                                                       | `/prefix !`         |
| /help      | none                                     | Displays a list of available commands, or detailed information for a specified command. | `/help`             |
| /games     | none                                     | Displays the supported games for this bot                                               | `/games`            |
| /getobject | \<game\> \<**yaw**\|**name**\|**fovt**\> | Displays the object from the array associated for a game                                | `/getobject ow yaw` |
| /info      | none                                     | Displays the major information about this bot                                           | `/info`             |
| /cminfo    | none                                     | Displays an explaination for what cm/rev (cm/360) is                                    | `/cminfo`           |

## Supported Games

### Games

- Aimgods: (`aimgods`)
- Apex Legends: (`apex-legends`, `apex`)
- Battlefield: (`battlefield`, `bf`)
- Call of Duty: (`cod`, `callofduty`, `call-of-duty`, `warzone`, `wz`)
- Counter Strike: (`cs`, `cs:go`, `csgo`)
- Destiny: (`destiny`, `d2`, `destiny2`)
- Diabotical: (`diabotical`, `dbt`)
- Fortnite: (`fortnite`, `fn`)
- Fortnite config: (`fn-config`, `fortnite-config`)
- Overwatch: (`overwatch`, `ow`)
- Quake: (`quake`)
- Rainbow Six: Siege: (`r6`, `rainbow6`, `r6s`)
- Reflex: (`reflex`, `reflex-arena`)
- Source: (`source`)
- Valorant: (`valorant`, `val`)
- Many more supported games use `games` command

## Built With

- [Discord.JS](https://github.com/discordjs/discord.js) - The Discord Integration
- [Discord.JS - Commando](https://github.com/discordjs/commando) - Framework for Discord.js
- [Node](https://nodejs.org/) - The Framework and Runtime
- [Mathjs](https://mathjs.org/) - Used for Math functions

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AnimaFPS/FPSMath/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
