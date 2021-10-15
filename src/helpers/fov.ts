export function convertFOV(
	fov: number,
	inputAspect: number,
	outputAspect: number
): number {
	return (
		(Math.atan(
			(outputAspect / inputAspect) * Math.tan((fov * Math.PI) / 360)
		) *
			360) /
		Math.PI
	)
}

export function filmToAspect(filmNotation: string): number {
	const startString = filmNotation.split(/M/)[0]
	const endString = filmNotation.split(/M[FLI]/)[1]
	return Number(startString) / Number(endString)
}

export function filmToTrue(
	fov: number,
	film: string,
	aspectRatio: number
): { horizontalFOV: number; verticalFOV: number } {
	if (film.startsWith('H')) {
		return lockHorizontal(fov, aspectRatio)
	} else if (film.startsWith('V')) {
		return lockVertical(fov, aspectRatio)
	} else if (/^\d{1,2}ML\d{1,2}$/.test(film)) {
		const filmAspect = filmToAspect(film)
		return lockVertical(fov, aspectRatio, filmAspect)
	} else if (/^\d{1,2}MF\d{1,2}$/.test(film)) {
		const filmAspect = filmToAspect(film)
		if (aspectRatio > filmAspect) {
			return lockHorizontal(fov, aspectRatio)
		}
		return lockVertical(fov, aspectRatio, filmAspect)
	} else if (/^\d{1,2}MI\d{1,2}$/.test(film)) {
		const filmAspect = filmToAspect(film)
		if (aspectRatio < filmAspect) {
			return lockHorizontal(fov, aspectRatio)
		}
		return lockVertical(fov, aspectRatio, filmAspect)
	}
	return lockHorizontal(fov, aspectRatio)
}

export function lockVertical(
	fov: number,
	aspectRatio: number,
	filmAspect?: number
): { horizontalFOV: number; verticalFOV: number } {
	if (filmAspect) {
		return {
			horizontalFOV: convertFOV(fov, filmAspect, aspectRatio),
			verticalFOV: convertFOV(fov, filmAspect, 1),
		}
	}
	return {
		horizontalFOV: convertFOV(fov, 1, aspectRatio),
		verticalFOV: fov,
	}
}

export function lockHorizontal(
	fov: number,
	aspectRatio: number
): { horizontalFOV: number; verticalFOV: number } {
	return {
		horizontalFOV: fov,
		verticalFOV: convertFOV(fov, aspectRatio, 1),
	}
}
