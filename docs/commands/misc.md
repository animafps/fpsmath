---
title: Miscellaneous 
---

!!! Tip
    For commands that accept input, you'll see keys with the following:

    - `<required>` - parameters between `<>` must be included with the command
    - `[optional]` - parameters between `[]` are optional parameters and may be excluded
    - `a | or | b` - `|` means that you can use the parameters on either side of the symbol
    - `repeat...` - means that you can provide multiple parameters as input

    These may be nested. Example: `[parameter1 <parameter2>]` means that the input is optional, but if you provide parameter1 then parameter2 is required. `[parameter...]` means that input is optional, and that the input can be any number of parameters.

## Commands

### cminfo

Displays an explanation for what cm/rev\(cm/360\) is

#### Usage

```text
fps-cminfo
```

### gameinfo

Displays the information associated for a game

#### Usage

```text
fps-gameinfo <game>
```

### games

Displays the supported games for this bot

#### Usage

```text
fps-games
```

#### Aliases

`supported-games`, `supportedgames`

### help

Displays a list of available commands, or detailed information for a specified command.

#### Usage

```text
fps-help [command]
```

#### Aliases

`commands`

### info

Displays the major information about this bot

#### Usage

```text
fps-info
```

### ping

Tests the latency

#### Usage

```text
fps-ping
```


