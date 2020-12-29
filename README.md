# Sensitivity, FOV, Focal length Converter and Calculator Bot

A Discord bot designed to convert sensitivities, fovs, mouse feel across themselves and preset games

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/AnimaFPS/FPSMath-bot?style=flat-square)](https://github.com/AnimaFPS/FPSMath-bot/blob/main/LICENSE)
[![dependencies](https://david-dm.org/AnimaFPS/FPSMath-bot.svg?style=flat-square)](https://david-dm.org/AnimaFPS/FPSMath-bot)
[![CodeFactor](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/badge/main?style=flat-square)](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/overview/main)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/AnimaFPS/FPSMath-bot?style=flat-square)](https://codeclimate.com/github/AnimaFPS/FPSMath-bot)

## Installing

[Install This Bot on Your Server](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240)

or build from source using Docker

Note: When building from source you have to input your own discord token in /src/config.json before building

## Usage

| Command  | Arguments                                                                  | Description                                                              | Example             |
| -------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------- |
| /cm      | {sensitivity value} {game or yaw value} {cpi/dpi}                          | Converts Senstivity to cm/360                                            | /cm 6 ow 1600       |
| /deg     | {sensitivity value} {game or yaw value} {cpi/dpi}                          | Converts Senstivity to deg/mm                                            | /deg 1.9 0.022 800  |
| /convert | {sensitivity value} {initial game or yaw value} {output game or yaw value} | Converts Different Sensitivities from one game to another                | /convert 3 ow 0.022 |
| /fov     | {fov} {input fov ratio or game} {output fov ratio or game}                 | Converts fovs from one type to another                                   | /fov 90 16:9 quake  |
| /focal   | {old sens} {old fov value} {new fov value}                                 | Focal Length Scales a desired sens between 2 fov values of the same type | /focal 3 90 100     |

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
- Destiny 2 (`destiny`)

### Ratios

(Supported ratios: 16:9, 4:3, 1:1)

## Built With

- [Discord.JS](https://github.com/discordjs/discord.js) - The Discord Intergration
- [Node](https://nodejs.org/) - The Framework and Runtime
- [Mathjs](https://mathjs.org/) - Used for Math functions

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
