---
title: Overview
---

!!! tip
    Remember to use the bot prefix when running a command!

    Global Prefix: `fps-`

    You can also use `@FPSMath` instead of the prefix. Example `@FPSMath help`

Below is a shortlist of all the bot commands.

## Math Commands

**Hint**: You can click on a command to go to its full help entry.

| **Command**                        | **Description **                                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`arcmin`](math.md#arcmin)         | Converts Sensitivity to arcmin                                                                                    |
| [`convert`](math.md#convert)       | Converts Different Sensitivities from one game to another                                                         |
| [`cm`](math.md#cm)                 | Converts Sensitivity to cm/rev                                                                                    |
| [`deg`](math.md#deg)               | Converts Sensitivity to deg/mm                                                                                    |
| [`mpi`](math.md#mpi)               | Converts Sensitivity to MPI                                                                                       |
| [`focal`](math.md#focal)           | Focal Length Scales a desired sens between 2 fov values of the same type                                          |
| [`fov`](math.md#fov)               | Finds the true vertical and horizontal FOVs for certain aspect ratio and game/FOV scaling method\(FILM notation\) |
| [`fovconvert`](math.md#fovconvert) | Converts a FOV value from one game or film notation to another                                                    |
| [`inch`](math.md#inch)             | Converts Sensitivity to inch/rev                                                                                  |
| [`sens`](math.md#sens)             | Converts cm/rev\|deg/mm\|MPI\|inch/rev\|arcmin to a game sensitivity default cm/rev                               |

## Miscellaneous Commands

| **Command**                 | **Description **                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------- |
| [`cminfo `](misc.md#cminfo) | Displays an explanation for what cm/rev \(cm/rev\) is                                   |
| [`gameinfo`](misc.md#games) | Displays the information associated for a game                                          |
| [`games`](misc.md#games)    | Displays the supported games for this bot                                               |
| [`info`](misc.md#info)      | Displays the major information about this bot                                           |
| [`help`](misc.md#help)      | Displays a list of available commands, or detailed information for a specified command. |
| [`ping`](misc.md#ping)      | Tests the latency                                                                       |

## Usage Key

For commands that accept input, you'll see keys with the following:

-   `<required>` - parameters between `<>` must be included with the command
-   `[optional]` - parameters between `[]` are optional parameters and may be excluded
-   `a | or | b` - `|` means that you can use the parameters on either side of the symbol
-   `repeat...` - means that you can provide multiple parameters as input

These may be nested. Example: `[parameter1 <parameter2>]` means that the input is optional, but if you provide parameter1 then parameter2 is required. `[parameter...]` means that input is optional, and that the input can be any number of parameters.

!!! tip
    Don't worry about memorizing this as its on top of all of the command pages
