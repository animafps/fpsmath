## [3.3.1](https://github.com/animafps/fpsmath/compare/v3.3.0...v3.3.1) (2021-10-15)


### Bug Fixes

* hotfix for fovconvert command doing wrong calculation ([f1c3df3](https://github.com/animafps/fpsmath/commit/f1c3df3766e7d74bdc67ed6c8974d9a670028726))

# [3.3.0](https://github.com/animafps/fpsmath/compare/v3.2.0...v3.3.0) (2021-10-15)


### Features

* added fov & fovconvert commands and fov helper functions ([#133](https://github.com/animafps/fpsmath/issues/133)) ([8c21582](https://github.com/animafps/fpsmath/commit/8c215824fa4c2ea258cad4b1c1a8281ed310bdde))

# [3.2.0](https://github.com/animafps/fpsmath/compare/v3.1.2...v3.2.0) (2021-10-14)


### Features

* added tf2 as a supported game and added invite command ([8bea8b6](https://github.com/animafps/fpsmath/commit/8bea8b6aa76c985b56da7ca2604930c05ea8c4e3))

## [3.1.2](https://github.com/animafps/fpsmath/compare/v3.1.1...v3.1.2) (2021-10-14)


### Bug Fixes

* **ready listener:** fixed users count ([970de7a](https://github.com/animafps/fpsmath/commit/970de7a68d8fa63afc51c96ec96e4a2c83b6e36b))

## [3.1.1](https://github.com/animafps/fpsmath/compare/v3.1.0...v3.1.1) (2021-10-12)


### Bug Fixes

* **array:** fixed bug with game names not allowing mixed or upper case inputs ([e33cdac](https://github.com/animafps/fpsmath/commit/e33cdaca902e6ce7e7cd95a0220c42b51e832a71))

# [3.1.0](https://github.com/animafps/fpsmath/compare/v3.0.6...v3.1.0) (2021-10-10)


### Features

* added better command error handling and replying ([#131](https://github.com/animafps/fpsmath/issues/131)) ([b658e6b](https://github.com/animafps/fpsmath/commit/b658e6b5dc3d287011970dcb5c3c9afcf2d18da8))

## [3.0.6](https://github.com/animafps/fpsmath/compare/v3.0.5...v3.0.6) (2021-10-10)


### Bug Fixes

* fixed info command not showing correct tag of the bot user ([5c00215](https://github.com/animafps/fpsmath/commit/5c0021509850f2761771618a59c7f83e247dba97))

## [3.0.5](https://github.com/animafps/fpsmath/compare/v3.0.4...v3.0.5) (2021-10-10)


### Bug Fixes

* fixed the sens command not showing correct help message and added correct command permisions ([d865a74](https://github.com/animafps/fpsmath/commit/d865a74e03b17c1622c6932efa88157dbc62c376))

## [3.0.4](https://github.com/animafps/fpsmath/compare/v3.0.3...v3.0.4) (2021-10-10)


### Bug Fixes

* fixed dependencies having conflict ([7b00614](https://github.com/animafps/fpsmath/commit/7b006145a65ce09ce38cf9eb8c8b1bb29277e7fa))

## [3.0.3](https://github.com/animafps/fpsmath/compare/v3.0.2...v3.0.3) (2021-09-30)


### Bug Fixes

* **deps:** update dependency colorette to v2 ([#117](https://github.com/animafps/fpsmath/issues/117)) ([0b89657](https://github.com/animafps/fpsmath/commit/0b8965735351ca45d4d94abea4f552db655b1e96))

## [3.0.2](https://github.com/animafps/fpsmath/compare/v3.0.1...v3.0.2) (2021-09-30)


### Bug Fixes

* fixed bug with convert and sens commands adding cm/rev to the output ([8d26dd0](https://github.com/animafps/fpsmath/commit/8d26dd0ab199bba3a30d4a0693d535b9b5a276cf))

## [3.0.1](https://github.com/animafps/fpsmath/compare/v3.0.0...v3.0.1) (2021-09-29)


### Bug Fixes

* fixed bug where analytics is being loaded before the client ([482f129](https://github.com/animafps/fpsmath/commit/482f129645a043ff85063e0f6e3f3cfbee83741d))


### Reverts

* reverts change to analytics system ([d8aad3e](https://github.com/animafps/fpsmath/commit/d8aad3e961f40be01004ddb1e00f95f9bf1e8e13))

# [3.0.0](https://github.com/animafps/fpsmath/compare/v2.2.3...v3.0.0) (2021-09-29)


### Features

* added docs, gameinfo, finished integration into sapphire, changed default prefix & more ([04130b2](https://github.com/animafps/fpsmath/commit/04130b25524b8dd0893bc6edb10dfb24a2368ef8))
* **game support:** now supports 3D Aim Trainer as a supported game for calculations ([08731ee](https://github.com/animafps/fpsmath/commit/08731ee068c5710555503fb685b91615b95f9779))
* initial commit for reformatting to Sapphire Framework ([bed2012](https://github.com/animafps/fpsmath/commit/bed20129944a5bbce6352b68de8e8ac7a1340d05))


### Reverts

* reverts the change with the PAT token in CD ([4e46b8c](https://github.com/animafps/fpsmath/commit/4e46b8c9d1c623141544721dc0d18717a99d0de6))
* troubleshooting the bot nolonger launching/recognising command messages ([2123884](https://github.com/animafps/fpsmath/commit/21238849fb8215f1b0ce5425e8bff642d1c40aeb))


### BREAKING CHANGES

* Changed default prefix to `fps-` and removed getobject command plus changed some of
the command aliases and flags

## [2.2.3](https://github.com/AnimaFPS/FPSMath/compare/v2.2.2...v2.2.3) (2021-06-27)


### Bug Fixes

* **array.ts:** fixed bad values for fn FOVT and BF yaw ([c975eed](https://github.com/AnimaFPS/FPSMath/commit/c975eed1bbb40e9cbdc9916d015563c5835bf85d))

## [2.2.2](https://github.com/AnimaFPS/FPSMath/compare/v2.2.1...v2.2.2) (2021-05-12)


### Bug Fixes

* **fovconvert:** fixed issue with vertical fov types not outputting the correct fov ([06ca1a1](https://github.com/AnimaFPS/FPSMath/commit/06ca1a1c9a9e55663841dc4143b1fc22484d9ea1))

## [2.2.1](https://github.com/AnimaFPS/FPSMath/compare/v2.2.0...v2.2.1) (2021-05-12)


### Bug Fixes

* **games command:** fixed footer to show correct games length ([0b76bc5](https://github.com/AnimaFPS/FPSMath/commit/0b76bc580ead7a88af01b60fc35353984b8c8773))

# [2.2.0](https://github.com/AnimaFPS/FPSMath/compare/v2.1.3...v2.2.0) (2021-05-12)


### Features

* **games:** added support for Halo: MCC, small qol changes for games command also ([4712263](https://github.com/AnimaFPS/FPSMath/commit/4712263baffaadc8186d4984ff7da52a951550aa))

## [2.1.3](https://github.com/AnimaFPS/FPSMath/compare/v2.1.2...v2.1.3) (2021-05-08)


### Bug Fixes

* **fov.ts:** fixed bug with fill method not functioning correctly ([686b5a5](https://github.com/AnimaFPS/FPSMath/commit/686b5a5d8997a6b9e68e793b3006df40780f2748))

## [2.1.2](https://github.com/AnimaFPS/FPSMath/compare/v2.1.1...v2.1.2) (2021-04-20)

### Bug Fixes

- **fov, fovconvert:** fixed issue with the fovt argument not being tested properly ([71b670a](https://github.com/AnimaFPS/FPSMath/commit/71b670a22bae83dc7fac0fb3b42d856c4f1efd62))

## [2.1.1](https://github.com/AnimaFPS/FPSMath/compare/v2.1.0...v2.1.1) (2021-04-19)

### Bug Fixes

- **fovconvert:** fixed issue with the testing of the arguments ([b38ab5d](https://github.com/AnimaFPS/FPSMath/commit/b38ab5df35846dc193c1899343f56296cd4dbfeb))

# [2.1.0](https://github.com/AnimaFPS/FPSMath/compare/v2.0.1...v2.1.0) (2021-04-19)

### Features

- Moved the framework to Akairo, added fovconvert, arcmin commands ([#59](https://github.com/AnimaFPS/FPSMath/issues/59)) ([3397b12](https://github.com/AnimaFPS/FPSMath/commit/3397b128c0020bf100b6059e020743bf878517e1))

## [2.0.1](https://github.com/AnimaFPS/FPSMath/compare/v2.0.0...v2.0.1) (2021-04-09)

### Bug Fixes

- **index:** fixed the api posters config ([054cf0b](https://github.com/AnimaFPS/FPSMath/commit/054cf0bd088588cf6a98cc0ef0679296822695bc))
