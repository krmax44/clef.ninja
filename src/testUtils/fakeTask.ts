import { CheckResult } from '@/tasks/Task';
import { treble } from '@/utils/noteConstants';

type FakeFn = jest.MockedFunction<() => CheckResult>;

export function fakeTask(check: FakeFn | boolean, retry: FakeFn = jest.fn()) {
	if (typeof check === 'boolean') {
		check = fakeCheck(check);
	}

	return { check, render() {}, clef: treble, retry, fake: true };
}

export function fakeCheck(
	correct: boolean,
	correctNotes: number[] = [],
	done = true
): FakeFn {
	return jest.fn(() => ({ done, correct, correctNotes }));
}
