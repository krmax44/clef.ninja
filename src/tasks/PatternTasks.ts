import TaskLickPattern from './TaskLickPattern';
import { randomFromArray } from '@/utils/randomHelper';

const PATTERNS = [TaskLickPattern];

export default PATTERNS;
export function randomPattern() {
	return randomFromArray(PATTERNS);
}
