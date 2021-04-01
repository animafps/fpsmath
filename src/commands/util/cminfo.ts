import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

module.exports = class cminfoCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "cminfo",
      group: "util",
      memberName: "cminfo",
      description: "Displays an explaination for what cm/360 is",
      examples: ["cminfo"],
    });
  }

  async run(message: CommandoMessage) {
    return message.say("cm/360 or cm/rev is a universal metric used for describing mouse sensitivity across all games. The definition is: how much centimeters you need to move your mouse in order to perform a 360 degree turn in-game.\n\n To calculate yours use the `cm` command");
  }
};
