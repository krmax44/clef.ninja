import TaskLickPattern from './TaskLickPattern';

const PATTERNS = [TaskLickPattern];

export default PATTERNS;
export function randomPattern() {
	return PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
}
