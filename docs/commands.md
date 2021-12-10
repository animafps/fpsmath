---
title: Commands
---

!!! tip
    Remember to use the bot prefix when running a command!

    Global Prefix: `fps-` or for Slash Commands: `/`

    You can also use `@FPSMath` instead of the prefix. Example `@FPSMath help`

    But in DMs no prefix is required

## Math Commands

| **Command**  | **Description**                                                                        | **Usage for message commands**                                                |
| ------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `arcmin`     | Converts Sensitivity to arcmin                                                         | `<sensitivity> <game | yaw> <CPI>`                                            |
| `convert`    | Converts Different Sensitivities from one game to another                              | `<sensitivity> <input game | yaw> <output game | yaw>`                        |
| `cm`         | Converts Sensitivity to cm/rev                                                         | `<sensitivity> <game | yaw> <CPI>`                                            |
| `deg`        | Converts Sensitivity to deg/mm                                                         | `<sensitivity> <game | yaw> <CPI>`                                            |
| `mpi`        | Converts Sensitivity to MPI                                                            | `<sensitivity> <game | yaw> <CPI>`                                            |
| `focal`      | Focal Length Scales a desired sens between 2 fov values of the same type               | `<sensitivity> <input FoV> <output FoV>`                                      |
| `fov`        | Finds the true vertical and horizontal FoV that is being displayed on screen           | `<FoV> <game | FILM> <aspect ratio>`                                          |
| `fovconvert` | Converts a FOV value from one game or film notation to another                         | `<FoV> <input game | FILM> <output game | FILM> <aspect ratio>`               |
| `inch`       | Converts Sensitivity to inch/rev                                                       | `<sensitivity> <game | yaw> <CPI>`                                            |
| `sens`       | Converts _cm/rev_ \| _deg/mm_ \| _MPI_ \| _inch/rev_ \| _arcmin_ to a game sensitivity | `<sensitivity> <game | yaw> <CPI> [--cm | --deg | --inch | --mpi | --arcmin]` |

---

## Miscellaneous Commands

| **Command** | **Description**                                                                         | **Usage for message commands** |
| ----------- | --------------------------------------------------------------------------------------- | ------------------------------ |
| `cminfo`    | Displays an explanation for what cm/rev \(cm/360\) is                                   |                                |
| `gameinfo`  | Displays the information associated for a game                                          | `<game>`                       |
| `games`     | Displays the supported games for this bot                                               |                                |
| `info`      | Displays the major information about this bot                                           |                                |
| `invite`    | Sends a link to invite the bot to your server                                           |                                |
| `help`      | Displays a list of available commands, or detailed information for a specified command. | `[command]`                    |
| `ping`      | Tests the latency                                                                       |                                |

## Usage Key

For commands that accept input, you'll see keys with the following:

- `<required>` - parameters between `<>` must be included with the command
- `[optional]` - parameters between `[]` are optional parameters and may be excluded
- `a | or | b` - `|` means that you can use the parameters on either side of the symbol
- `repeat...` - means that you can provide multiple parameters as input

These may be nested. Example: `[parameter1 <parameter2>]` means that the input is optional,
but if you provide parameter1 then parameter2 is required. `[parameter...]` means that input is optional,
and that the input can be any number of parameters.
