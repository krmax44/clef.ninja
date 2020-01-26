import { CheckResult } from '@/tasks/Task';
import { treble } from '@/utils/noteConstants';

type FakeCheck = jest.MockedFunction<() => CheckResult>;

export function fakeTask(check: FakeCheck | boolean, clef = treble) {
	if (typeof check === 'boolean') {
		check = fakeCheck(check);
	}

	return { check, render() {}, clef };
}

export function fakeCheck(
	correct: boolean,
	correctNotes: number[] = [],
	done = true
): FakeCheck {
	return jest.fn(() => ({ done, correct, correctNotes }));
}
