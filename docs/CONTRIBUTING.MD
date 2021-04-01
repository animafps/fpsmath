# Contributing to FPSMath

Thanks for showing your interest in using or contributing to this project

## Links

* [Discord Server](https://discord.gg/xJdQxps) - Join to ask questions or to discuss this project with me and other contributors

## How to Setup

Using Nodejs above v14.0.0

1. Download the [Latest Release](https://github.com/AnimaFPS/FPSMath/releases/latest) or clone the repo(`git clone https://github.com/AnimaFPS/FPSMath.git`)
2. Navigate and open a command prompt or terminal in the root directory
3. Install npm dependencies `npm ci` or `npm i`
4. Create a .env file for environment variables
   1. `DISCORD_TOKEN` for the discord bot token
   2. `OWNERID` for the owners discord id
   3. `PREFIX` for the command prefix
   4. `INVITE` for a link to a support server
   5. there are more for api's that you can use for online bot directories
5. To run you execute the start script with `npm run start` from the root directory
6. Code as much as you want

## How to submit changes

1. Stage the changes(`git add .`)
2. Lint-staged and commit with npm script (`npm run commit` or `cz`)/ [commitizen](https://https://github.com/commitizen/cz-cli) to make sure all push requests and commits are uniform
3. push to a pull request

## How to report a bug

Click this link: [Make a new issue](https://github.com/AnimaFPS/FPSMath/issues/new?assignees=&labels=&template=bug_report.md&title=)

## How to request a feature or new command

Click this link: [Make a new issue](https://github.com/AnimaFPS/FPSMath/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Style guide

This project uses

* [Commitizen](https://https://github.com/commitizen/cz-cli) for the commit messages
* [Prettier](https://prettier.io/) for the code styling
