import { ArgumentTypeCaster } from "discord-akairo";
import type { Message } from "discord.js";
import { getObject } from "../array";

export const gameTypeCaster: ArgumentTypeCaster = (
  message: Message,
  phrase
): string | null => (getObject(phrase, "yaw") ? phrase : null);
