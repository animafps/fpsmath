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
        usage: "<fov> <game | FILM notation> <aspect ratio>",
        flags: "-dp <output decimal places>",
        examples: ["fov 90 source 16:9", "fov 100 16MI9 21:9"],
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
    message: Message,
    args: { fov: number; fovt: string; aspect: { match: string }; dp: number }
  ): Promise<Message | undefined> {
    let output: { hfov?: number; vfov?: number } = {
      hfov: undefined,
      vfov: undefined,
    };
    if (
      !getObject(args.fovt, "afovt") &&
      !/^hm[lfi]$|vm[lfi]$|\d{1,2}m[lfi]\d{1,2}$/i.test(args.fovt)
    ) {
      return message.util?.reply(
        `Invalid command usage. The \`fov\` command's accepted format is \`fov <fov> <Game | FILM> <aspect ratio>\`. Use \`help fov\` for more information`
      );
    }

    const getFOVT = (game: string) => {
      return (getObject(game, "afovt") ? getObject(game, "afovt") || "" : game)
        .toString()
        .toLowerCase();
    };

    const convertFOV = (from: number, to: number, fov: number) => {
      return (atan((to / from) * tan((fov * pi) / 360)) * 360) / pi;
    };

    const fovtAspect =
      Number(getFOVT(args.fovt).split(/m[l|f|i]/gi)[0]) /
      Number(getFOVT(args.fovt).split(/m[l|f|i]/gi)[1]);

    const fovtEndsWith = getFOVT(args.fovt).split("m")[1][0];

    const fovtStartsWith = getFOVT(args.fovt).split(/m[l|f|i]/gi)[0];

    const argAspect =
      Number(args.aspect.match.toString().split(":")[0]) /
      Number(args.aspect.match.toString().split(":")[1]);

    if (fovtEndsWith === "l" && !isNaN(Number(fovtStartsWith))) {
      output = {
        vfov: convertFOV(fovtAspect, 1, args.fov),
        hfov: convertFOV(fovtAspect, argAspect, args.fov),
      };
    } else if (fovtEndsWith === "l" && fovtStartsWith === "h") {
      output = { vfov: convertFOV(argAspect, 1, args.fov), hfov: args.fov };
    } else if (fovtEndsWith === "l" && fovtStartsWith === "v") {
      output = { hfov: convertFOV(1, argAspect, args.fov), vfov: args.fov };
    } else if (fovtStartsWith === "f") {
      if (argAspect > fovtAspect) {
        output = { hfov: args.fov, vfov: convertFOV(argAspect, 1, args.fov) };
      } else {
        output = {
          hfov: convertFOV(fovtAspect, argAspect, args.fov),
          vfov: convertFOV(fovtAspect, 1, args.fov),
        };
      }
    } else if (fovtEndsWith === "i") {
      if (argAspect > fovtAspect) {
        output = {
          hfov: convertFOV(fovtAspect, argAspect, args.fov),
          vfov: convertFOV(fovtAspect, 1, args.fov),
        };
      } else {
        output = { hfov: args.fov, vfov: convertFOV(argAspect, 1, args.fov) };
      }
    }
    return message.reply(`Horizontal FOV: ${
      output.hfov?.toFixed(args.dp) || "error"
    }
    Vertical FOV: ${output.vfov?.toFixed(args.dp) || "error"}`);
  }
}
