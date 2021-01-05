![FPSMath](https://socialify.git.ci/animafps/fpsmath/image?description=1&font=Inter&language=1&logo=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F792712521546465301%2Fa8176886ccd814f17b4c5a98b62e185a.png%3Fsize%3D256&owner=1&pattern=Plus&theme=Dark)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/AnimaFPS/FPSMath?style=flat-square)](https://github.com/AnimaFPS/FPSMath/blob/main/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/animafps/fpsmath/badge/main?style=flat-square)](https://www.codefactor.io/repository/github/animafps/fpsmath/overview/main)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/AnimaFPS/FPSMath/CI?logo=github&style=flat-square)](https://github.com/AnimaFPS/FPSMath/Actions)

## Installing

[Install This Bot on Your Server](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240)

or build from source using Docker

Note: When building from source you have to input your own discord token in /src/config.json before building

## Usage

| Command   | Arguments                                                                  | Description                                                                                            | Example                   |
| --------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------- |
| /cm       | &lt;sensitivity value&gt; &lt;game or yaw value&gt; &lt;cpi/dpi&gt;                          | Converts Senstivity to cm/360                                                                          | /cm 6 ow 1600             |
| /deg      | &lt;sensitivity value&gt; &lt;game or yaw value&gt; &lt;cpi/dpi&gt;                          | Converts Senstivity to deg/mm                                                                          | /deg 1.9 0.022 800        |
| /convert  | &lt;sensitivity value&gt; &lt;initial game or yaw value&gt; &lt;output game or yaw value&gt; | Converts Different Sensitivities from one game to another                                              | /convert 3 ow 0.022       |
| /fov      | &lt;input fov&gt; &lt;input aspect ratio or game&gt; &lt;output aspect ratio or game&gt;     | Converts fovs from one type to another or finds the equivilent for a differnet resolution aspect ratio | /fov 90 16:9 quake        |
| /focal    | &lt;old sens&gt; &lt;old fov value&gt; &lt;new fov value&gt;                                 | Focal Length Scales a desired sens between 2 fov values of the same type                               | /focal 3 90 100           |
| /sens     | &lt;cm/360&gt; &lt;game or yaw value&gt; &lt;cpi/dpi&gt;                                     | Converts cm/360 to a game sensitivity                                                                  | /sens 28 quake 1600       |
| /sens-deg | &lt;deg/mm&gt; &lt;game or yaw value&gt; &lt;cpi/dpi&gt;                                     | Converts deg/mm to a game sensitivity                                                                  | /sens-deg 1.28 quake 1600 |

## Supported Games and FOV Ratios

### Games

- Apex Legends (`apex`)
- Aimgods (`aimgods`)
- Call of Duty (`cod`)
- Counter Strike(`cs` or `csgo`)
- Fortnite Config (`fortnite` or `fortnite-config`)
- Overwatch (`overwatch` or `ow`)
- Quake (`quake`)
- Rainbow Six Siege (`r6`)
- Source Engine games (`source`)
- Valorant (`valorant` or `val`)
- Battlefield (`battlefield`)
- Destiny 2 (`destiny`)

## Built With

- [Discord.JS](https://github.com/discordjs/discord.js) - The Discord Intergration
- [Discord.JS - Commando](https://github.com/discordjs/commando) - Framework for Discord.js
- [Node](https://nodejs.org/) - The Framework and Runtime
- [Mathjs](https://mathjs.org/) - Used for Math functions

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/AnimaFPS/FPSMath/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
