---
title: Math
---

!!! Tip
    For commands that accept input, you'll see keys with the following:

    - `<required>` - parameters between `<>` must be included with the command
    - `[optional]` - parameters between `[]` are optional parameters and may be excluded
    - `a | or | b` - `|` means that you can use the parameters on either side of the symbol
    - `repeat...` - means that you can provide multiple parameters as input

    These may be nested. Example: `[parameter1 <parameter2>]` means that the input is optional, but if you provide parameter1 then parameter2 is required. `[parameter...]` means that input is optional, and that the input can be any number of parameters.

## Commands


### arcmin 

Converts sensitivity to arcmin

#### Usage

```text
fps-arcmin <sens> <game | yaw> <cpi>
```

### convert

Converts different sensitivities from one game or yaw value to another

#### Usage

```text
fps-convert <sens> <input game | yaw> <output game | yaw>
```

#### Aliases

```text
convert-sens, convertsens, convert-yaw, convertyaw
```

### cm

Converts Sensitivity to cm/rev(cm/360)

#### Usage

```text
fps-cm <sens> <game | yaw> <cpi>
```

#### Aliases

`cm/rev`, `cm/360`

### deg

Converts Sensitivity to deg/mm

#### Usage

```text
fps-deg <sens> <game | yaw> <cpi>
```

#### Aliases

`deg/mm`

### mpi

Converts Sensitivity to mpi(mrad/inch)

#### Usage

```text
fps-mpi <sens> <game | yaw> <cpi>
```

#### Aliases

`mrad`, `milliradian`, `mrad/inch`, `milliradian/inch`

### focal

Focal Length Scales a desired sensitivity between 2 fov values of the same type/ game

#### Usage

```text
fps-focal <sens> <old fov> <new fov>
```

#### Aliases

`focal-scaling`, `focalscailing`

### fov

!!! error
    Command not implemented yet

### fovconvert

!!! error
    Command not implemented yet

### inch

Converts sensitivity to inch/rev(inch/360)

#### Usage

```text
fps-inch <sens> <game | yaw> <cpi>
```

#### Aliases

`inch/360`, `inch/rev`

### sens

Converts cm/rev(default), deg/mm, inch/rev, mpi to a game sensitivity

#### Usage

```text
fps-sens <cm/rev | deg/mm | inch/rev | mpi | arcmin> <game | yaw> <cpi>
```

#### Supported Flags

```text
--cm // if the input value's unit is cm/rev it is the default and optional
--deg // if the input value's unit is deg/mm
--inch // if the input value's unit is inch/rev
--mpi // if the input value's unit is mpi
```
