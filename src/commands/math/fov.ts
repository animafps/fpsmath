import { atan, tan, pi } from "mathjs";
import { getObject } from "../../array";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import type { Message } from "discord.js";
module.exports = class fovCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "fov",
      aliases: ["fov-scailing", "film"],
      group: "math",
      memberName: "fov",
      description: "Finds the true vertical and horizontal FOVs for certain aspect ratio and game/FOV scaling method(FILM notation)",
      details:
        "Finds the true vertical and horizontal FOVs for certain aspect ratio that the game is being rendered at and game/FOV scaling method(FILM notation) \nTo see the Supported games use the `games` Command \n [To learn about FILM notation click here](https://www.kovaak.com/film-notation/)",
      examples: ["fov 90 4ML3 16:10", "fov 103 ow 1920:1440"],
      format: "<fov> <fov> <game|FILM notation> <aspect ratio> [decimal places]",

      args: [
        {
          key: "fov",
          prompt: "What fov value do you want to convert from",
          type: "float",
        },
        {
          key: "fovt",
          label: "Input Game or Game's FOV Scailing",
          prompt: "What Game or aspect ratio do you want to convert from",
          type: "string",
        },
        {
          key: "aspect",
          label: "",
          prompt: "",
          type: "ratio",
          default: "16:9",
        },
        {
          key: "dp",
          label: "decimal places",
          prompt: "How Many Decimal places",
          type: "float",
          default: "3",
        },
      ],
    });
  }

  async run(
    msg: CommandoMessage,
    args: { fov: number; fovt: string; aspect?: string; dp?: number }
  ): Promise<Message> {
    const FOVT = (game: string) => {
      if (getObject(game, "afovt") !== game) {
        return getObject(game, "afovt").toLowerCase();
      } else {
        return game.toLowerCase();
      }
    };

    const func = (from: number, to: number, fov: number) => {
      return (atan((to / from) * tan((fov * pi) / 360)) * 360) / pi;
    };

    const fovtAspect =
      parseFloat(FOVT(args.fovt).split(/m[l|f|i]/)[0]) /
      parseFloat(FOVT(args.fovt).split(/m[l|f|i]/)[1]);

    const argAspect =
      parseFloat(args.aspect?.split(":")[0] || "") /
      parseFloat(args.aspect?.split(":")[1] || "");

    const output = () => {
      if (
        FOVT(args.fovt).split(/m|M/)[1].toLowerCase().startsWith("l") &&
        (args.fovt.split("")[0].toLowerCase() !== "v" || "h")
      ) {
        return {
          vfov: func(fovtAspect, 1, args.fov),
          hfov: func(fovtAspect, argAspect, args.fov),
        };
      } else if (
        FOVT(args.fovt).split(/m|M/)[1].toLowerCase().startsWith("l") &&
        args.fovt.split("")[0].toLowerCase() == "h"
      ) {
        return { vfov: func(argAspect, 1, args.fov), hfov: args.fov };
      } else if (
        FOVT(args.fovt).split(/m|M/)[1].toLowerCase().startsWith("l") &&
        args.fovt.split("")[0].toLowerCase() == "v"
      ) {
        return { hfov: func(1, argAspect, args.fov), vfov: args.fov };
      } else if (
        FOVT(args.fovt).split(/m|M/)[1].toLowerCase().startsWith("f")
      ) {
        if (argAspect > fovtAspect) {
          return { hfov: args.fov, vfov: func(argAspect, 1, args.fov) };
        } else {
          return {
            hfov: func(fovtAspect, argAspect, args.fov),
            vfov: func(fovtAspect, 1, args.fov),
          };
        }
      } else if (
        FOVT(args.fovt).split(/m|M/)[1].toLowerCase().startsWith("i")
      ) {
        if (argAspect > fovtAspect) {
          return {
            hfov: func(fovtAspect, argAspect, args.fov),
            vfov: func(fovtAspect, 1, args.fov),
          };
        } else if (argAspect < fovtAspect) {
          return {
            hfov: args.fov,
            vfov: func(argAspect, 1, args.fov),
          };
        } else {
          return { hfov: args.fov, vfov: func(argAspect, 1, args.fov) };
        }
      }
      return { hfov: undefined, vfov: undefined };
    };
    return msg.reply(`Horizontal FOV: ${output().hfov?.toFixed(args.dp) || "error"}
    Vertical FOV: ${output().vfov?.toFixed(args.dp) || "error"}`);
  }
};
