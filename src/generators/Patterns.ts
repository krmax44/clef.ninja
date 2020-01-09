import LickPatternGen from './LickPatternGen';

const PATTERNS = [LickPatternGen];

export default PATTERNS;
export function randomPattern() {
	return PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
}
