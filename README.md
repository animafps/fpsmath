# FPSMath

[![FPSMath](https://socialify.git.ci/animafps/fpsmath/image?description=1&font=Inter&language=1&logo=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F792712521546465301%2Fa8176886ccd814f17b4c5a98b62e185a.png%3Fsize%3D256&owner=1&pattern=Plus&theme=Dark)](https://github.com/AnimaFPS/FPSMath)

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnimaFPS/FPSMath?style=flat-square)](https://github.com/AnimaFPS/FPSMath/releases)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![CodeFactor](https://www.codefactor.io/repository/github/animafps/fpsmath/badge/main?style=flat-square)](https://www.codefactor.io/repository/github/animafps/fpsmath/overview/main)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/AnimaFPS/FPSMath/CI?logo=github&style=flat-square)](https://github.com/AnimaFPS/FPSMath/Actions)

[![Discord Bots](https://top.gg/api/widget/792712521546465301.svg)](https://top.gg/bot/792712521546465301)

## Installing

[Install This Bot on Your Server](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240) or DM `FPS Math#9838` with the commands outside of a server

or build from source using Docker
or from source `npm ci` or `npm install` then `npm start`

Note: When building or runing from source you have to input your own discord token in /src/config.json or in the environment variables under `DISCORD_TOKEN` before building or running

## Usage

\<required\|alternitive option\> \[optional\] **exact argument**

### Main Commands

| Command  | Arguments                                                                | Description                                                                                            | Example                   |
| -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------- |
| /cm      | \<sens\> \<game\|yaw\> \<cpi\>                                           | Converts Senstivity to cm/360                                                                          | `/cm 6 ow 1600`           |
| /deg     | \<sens\> \<game\|yaw\> \<cpi\>                                           | Converts Senstivity to deg/mm                                                                          | `/deg 1.9 0.022 800`      |
| /convert | \<sens\> \<initial game\|yaw\> \<output game\|yaw\>                      | Converts Different Sensitivities from one game to another                                              | `/convert 3 ow 0.022`     |
| /fov     | \<input fov\> \<input aspect ratio\|game\> \<output aspect ratio\|game\> | Converts fovs from one type to another or finds the equivilent for a differnet resolution aspect ratio | `/fov 90 16:9 quake`      |
| /focal   | \<sens\> \<old fov\> \<new fov\>                                         | Focal Length Scales a desired sens between 2 fov values of the same type                               | `/focal 3 90 100`         |
| /sens    | \<cm/360\> \<game\|yaw\> \<cpi/dpi\> \[**-cm**\|**-deg**\|**-inch**\]    | Converts cm/360\|deg/mm\|inch/360 to a game sensitivity                                                | `/sens 28 quake 1600 -cm` |

### Utility Commands

| Command    | Arguments                                | Description                                                                             | Example             |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------------------- | ------------------- |
| /prefix    | \<prefix\|**none**\|**default**\>        | Shows or sets the command prefix.                                                       | `/prefix !`         |
| /help      | none                                     | Displays a list of available commands, or detailed information for a specified command. | `/help`             |
| /games     | none                                     | Displays the supported games for this bot                                               | `/games`            |
| /getobject | \<game\> \<**yaw**\|**name**\|**fovt**\> | Displays the object from the array assoiated for a game                                 | `/getobject ow yaw` |

## Supported Games

### Games

- Aimgods: (`aimgods`)
- Apex Legends: (`apex-legends`, `apex`)
- Battlefield: (`battlefield`, `bf`)
- Call of Duty: (`cod`, `callofduty`, `call-of-duty`, `warzone`, `wz`)
- Counter Strike: (`cs`, `cs:go`, `csgo`)
- Destiny: (`destiny`, `d2`, `destiny2`)
- Diabotical: (`diabotical`, `dbt`)
- Fortnite: (`fornite`, `fn`)
- Fortnite config: (`fn-config`, `fornite-config`)
- Overwatch: (`overwatch`, `ow`)
- Quake: (`quake`)
- Rainbow Six: Siege: (`r6`, `rainbow6`, `r6s`)
- Source: (`source`)
- Valorant: (`valorant`, `val`)

## Built With

- [Discord.JS](https://github.com/discordjs/discord.js) - The Discord Intergration
- [Discord.JS - Commando](https://github.com/discordjs/commando) - Framework for Discord.js
- [Node](https://nodejs.org/) - The Framework and Runtime
- [Mathjs](https://mathjs.org/) - Used for Math functions

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AnimaFPS/FPSMath/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
