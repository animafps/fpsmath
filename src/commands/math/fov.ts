import { atan, tan, pi } from "mathjs";
import { getObject } from "../../array";
import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class fovCommand extends Command {
  constructor() {
    super("fov", {
      aliases: ["fov-scailing", "film", "fov"],
      description: {
        content:
          "Finds the true vertical and horizontal FOVs for certain aspect ratio that the game is being rendered at and game/FOV scaling method(FILM notation)",
        extra:
          "To see the Supported games use the `games` Command \n [To learn about FILM notation click here](https://www.kovaak.com/film-notation/)",
      },
      args: [
        {
          id: "fov",
          type: "number",
          prompt: true,
        },
        {
          id: "fovt",
          prompt: true,
        },
        {
          id: "aspect",
          type: /^\d{1,4}:\d{1,4}$/g,
          default: "16:9",
          prompt: true,
        },
        {
          id: "dp",
          type: "number",
          match: "option",
          flag: ["-dp", "dp:", "dp"],
          default: 3,
        },
      ],
      argumentDefaults: {
        prompt: {
          start: `Invalid command usage. The \`fov\` command's accepted format is \`fov <fov> <Game | FILM> <aspect ratio>\`. Use \`help fov\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }

  async exec(
    msg: Message,
    args: { fov: number; fovt: string; aspect?: string; dp?: number }
  ): Promise<Message> {
    const FOVT = (game: string) => {
      return (getObject(game, "afovt")
        ? getObject(game, "afovt") || "".toLowerCase()
        : game.toLowerCase()
      ).toString();
    };

    const func = (from: number, to: number, fov: number) => {
      return (atan((to / from) * tan((fov * pi) / 360)) * 360) / pi;
    };

    const fovtAspect =
      Number(FOVT(args.fovt).split(/m[l|f|i]/)[0]) /
      Number(FOVT(args.fovt).split(/m[l|f|i]/)[1]);

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
    return msg.reply(`Horizontal FOV: ${
      output().hfov?.toFixed(args.dp) || "error"
    }
    Vertical FOV: ${output().vfov?.toFixed(args.dp) || "error"}`);
  }
}
