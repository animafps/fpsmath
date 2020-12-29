# Sensitivity, FOV, Focal length Converter and Calculator Bot

A Discord bot designed to convert sensitivities, fovs, mouse feel across themselves and preset games

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![dependencies](https://david-dm.org/AnimaFPS/FPSMath-bot.svg?style=flat-square)](https://david-dm.org/AnimaFPS/FPSMath-bot)
[![CodeFactor](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/badge/main?style=flat-square)](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/overview/main)
[![Licence](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/AnimaFPS/FPSMath-bot/LICENCE)

# Installation
[Install This Bot](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240)
or build from source using Docker

Note: When building from source you have to input your own discord token in /src/config.json

# Usage
| Command  | Arguments                                                                  | Description                                               | Example             |
|----------|----------------------------------------------------------------------------|-----------------------------------------------------------|---------------------|
| /cm      | {sensitivity value} {game or yaw value} {cpi/dpi}                          | Converts Senstivity to cm/360                             | /cm 6 ow 1600       |
| /deg     | {sensitivity value} {game or yaw value} {cpi/dpi}                          | Converts Senstivity to deg/mm                             | /deg 1.9 0.022 800  |
| /convert | {sensitivity value} {initial game or yaw value} {output game or yaw value} | Converts Different Sensitivities from one game to another | /convert 3 ow 0.022 |
| /fov     | {fov} {input fov ratio or game} {output fov ratio or game}                 | Converts fovs from one type to another                                   | /fov 90 16:9 quake  |
| /focal   | {old sens} {old fov value} {new fov value}                                 | Focal Length Scales a desired sens between 2 fov values of the same type | /focal 3 90 100     |

(Supported games: aimgods, source, csgo, cs, quake, apex, val, valorant, ow, overwatch, fn, fortnite, fn-config, fortnite-config, dbt, r6, cod, destiny)
(Supported ratios: 16:9, 4:3, 1:1)
