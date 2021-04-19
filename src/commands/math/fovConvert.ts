import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { getObject } from "../../array";
import { atan, tan, pi } from "mathjs";

export default class FOVConvertCommand extends Command {
  constructor() {
    super("fovconvert", {
      aliases: ["fov-convert", "film-convert", "convert-fov"],
      description: {
        content:
          "Converts a FOV value from one game or film notation to another",
        usage:
          "<fov> <input game | FILM notation> <output game | FILM notation> <aspect ratio>",
        flags: "-dp <output decimal places>",
        examples: ["fovconvert 90 source 16MF9 16:9"],
      },
      args: [
        {
          id: "fov",
          type: "number",
          prompt: true,
        },
        {
          id: "inFOVT",
          prompt: true,
        },
        {
          id: "outFOVT",
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
          start: `Invalid command usage. The \`fovconvert\` command's accepted format is \`fovconvert <fov> <input game | FILM> <output game | FILM> <aspect ratio>\`. Use \`help fovconvert\` for more information`,
          time: 1,
          retries: 0,
        },
      },
    });
  }
  async exec(
    message: Message,
    args: {
      fov: number;
      inFOVT: string;
      outFOVT: string;
      aspect: { match: string[] };
      dp: number;
    }
  ): Promise<Message | undefined> {
    if (!getObject(args.inFOVT, "afovt") || !getObject(args.outFOVT, "afovt")) {
      if (
        !/^\d{1,2}m[lfi]\d{1,2}$/gi.test(
          !getObject(args.inFOVT, "afovt")
            ? args.inFOVT.toLowerCase()
            : args.outFOVT.toLowerCase()
        ) &&
        !/^[hv]m[lif]/gi.test(
          !getObject(args.inFOVT, "afovt")
            ? args.inFOVT.toLowerCase()
            : args.outFOVT.toLowerCase()
        )
      ) {
        return message.util?.reply(
          `${
            !getObject(args.inFOVT, "afovt") ? args.inFOVT : args.outFOVT
          } not supported. To see the supported game us the \`games\` command`
        );
      }
    }

    if (
      !/^\d{1,2}m[lfi]\d{1,2}$/gi.test(
        !getObject(args.inFOVT, "afovt")
          ? args.inFOVT.toLowerCase()
          : args.outFOVT.toLowerCase()
      ) &&
      !/^[hv]m[lif]/gi.test(
        !getObject(args.inFOVT, "afovt")
          ? args.inFOVT.toLowerCase()
          : args.outFOVT.toLowerCase()
      )
    ) {
      return message.util?.reply(
        "Incorrect FILM Notation. To learn about Film notation read this: <https://www.kovaak.com/film-notation/>"
      );
    }
    const getFOVT = (game: string) => {
      return (getObject(game, "afovt") ? getObject(game, "afovt") || "" : game)
        .toString()
        .toLowerCase();
    };

    const convertFOV = (from: number, to: number, fov: number) =>
      (atan((to / from) * tan((fov * pi) / 360)) * 360) / pi;

    const fovtAspect = (fovt: string) =>
      Number(fovt.split(/m[l|f|i]/)[0]) / Number(fovt.split(/m[l|f|i]/)[1]);

    const fovtEndsWith = (fovt: string) => fovt.split(/m|M/)[1][0];

    const fovtStartsWith = (fovt: string) => fovt[0];

    const argAspect =
      Number(args.aspect.match.toString().split(":")[0] || "") /
      Number(args.aspect.match.toString().split(":")[1] || "");

    function findFOV(fovt: string, fov: number) {
      if (fovtEndsWith(fovt) === "l" && !isNaN(Number(fovtStartsWith(fovt)))) {
        return {
          vfov: convertFOV(fovtAspect(fovt), 1, fov),
          hfov: convertFOV(fovtAspect(fovt), argAspect, fov),
        };
      } else if (fovtEndsWith(fovt) === "l" && fovtStartsWith(fovt) === "h") {
        return { vfov: convertFOV(argAspect, 1, fov), hfov: fov };
      } else if (fovtEndsWith(fovt) === "l" && fovtStartsWith(fovt) === "v") {
        return { hfov: convertFOV(1, argAspect, fov), vfov: fov };
      } else if (fovtEndsWith(fovt) === "f") {
        if (argAspect >= fovtAspect(fovt)) {
          return { hfov: fov, vfov: convertFOV(argAspect, 1, fov) };
        } else {
          return {
            hfov: convertFOV(fovtAspect(fovt), argAspect, fov),
            vfov: convertFOV(fovtAspect(fovt), 1, fov),
          };
        }
      } else if (fovtEndsWith(fovt) === "i") {
        if (argAspect > fovtAspect(fovt)) {
          return {
            hfov: convertFOV(fovtAspect(fovt), argAspect, fov),
            vfov: convertFOV(fovtAspect(fovt), 1, fov),
          };
        } else if (argAspect < fovtAspect(fovt)) {
          return {
            hfov: fov,
            vfov: convertFOV(argAspect, 1, fov),
          };
        } else {
          return { hfov: fov, vfov: convertFOV(argAspect, 1, fov) };
        }
      }
    }

    const output =
      fovtStartsWith(args.inFOVT) === "v"
        ? findFOV(
            getFOVT(args.outFOVT),
            findFOV(getFOVT(args.inFOVT), args.fov)?.hfov || 0
          )?.vfov
        : findFOV(
            getFOVT(args.outFOVT),
            findFOV(getFOVT(args.inFOVT), args.fov)?.hfov || 0
          )?.hfov;

    return message.util?.reply(output?.toFixed(args.dp));
  }
}
