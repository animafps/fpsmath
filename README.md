# Sensitivity, FOV, Focal length Converter and Calculator Bot

A Discord bot designed to convert sensitivities, fovs, mouse feel across themselves and preset games

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![dependencies](https://david-dm.org/AnimaFPS/FPSMath-bot.svg?style=flat-square)](https://david-dm.org/AnimaFPS/FPSMath-bot)
[![CodeFactor](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/badge/main?style=flat-square)](https://www.codefactor.io/repository/github/animafps/fpsmath-bot/overview/main)

# Installation
[Install This Bot](https://discordapp.com/api/oauth2/authorize?client_id=792712521546465301&scope=bot&permissions=10240)
or build from source using Docker

Note: When building from source you have to input your own discord token in /src/config.json

# Usage
```sh
/cm <sensitivity value> <game or yaw value> <cpi/dpi>
/deg <sensitivity value> <game or yaw value> <cpi/dpi>
/fov <fov> <input fov ratio or game> <output fov ratio or game> (Supported ratios: 16:9, 4:3, 1:1)
/sens <cm/360 value> <game or yaw value> <cpi/dpi>
/focal <old sens> <old fov> <new fov>
/convert <sensitivity value> <initial game or yaw value> <output game or yaw value>
```
(Supported games: aimgods, source, csgo, cs, quake, apex, val, valorant, ow, overwatch, fn, fortnite, fn-config, fortnite-config, dbt, r6, cod, destiny)
