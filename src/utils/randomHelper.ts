export function randomFromArray<T>(array: T[]) {
	return array[Math.floor(Math.random() * array.length)];
}

export function randomBetween(MIN: number, MAX: number) {
	return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}
