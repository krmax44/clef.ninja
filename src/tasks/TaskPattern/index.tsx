import Task, { TaskContext } from '../Task';
import Note from '@/utils/Note';
import Vue from 'vue';

import { Renderer, StaveNote, StaveRest } from '@/utils/VexHelper';
import randomPattern, { Pattern } from './randomPattern';
import { updateLifecycle } from '@/utils/houkLifecycle';

export default class TaskPattern extends Task {
	private pattern: Pattern;
	private checks: { correct: Note[]; wrong: number[]; attempts: number }[] = [];
	private checkCount = 0;

	constructor(context: TaskContext) {
		super(context);

		const { difficulty, clefs, instrument } = this;

		this.pattern = randomPattern(clefs, difficulty);
		this.notes = this.pattern.filter(p => typeof p !== 'string') as Note[][];

		const center = Note.centerNote(this.notes.flat());
		this.clef = new Note(center, undefined, instrument).determineClef(clefs);
	}

	staveNotes() {
		let i = 0;

		return this.pattern.map(beat => {
			if (typeof beat === 'string') {
				return StaveRest(beat);
			} else {
				if (
					this.checkCount === i &&
					!this.checks[i]?.correct.length &&
					!this.checks[i]?.wrong.length
				) {
					beat.forEach(n => (n.color = '#31bced'));
				}

				const notesBefore = this.notes.slice(0, i).flat();
				i++;
				return StaveNote(beat, this.clef, true, notesBefore);
			}
		});
	}

	public render() {
		Renderer.apply(this, [400]);
	}

	public check(input: number) {
		const progress = this.checkCount;
		const note = this.notes[progress].find(n => n.midiNote === input);

		const correctNotes = this.notes[progress].map(n => n.midiNote);
		const correct = note !== undefined;

		if (this.checks[progress] === undefined)
			this.checks[progress] = { correct: [], wrong: [], attempts: 0 };
		const current = this.checks[progress];
		const beatCount = this.notes[progress].length;

		let score = true;
		let retry = true;

		if (typeof note !== 'undefined') {
			if (!current.correct.includes(note)) current.correct.push(note);
			else score = false;

			note.color = '#92dd6e';
			retry = false;
		} else {
			if (!current.wrong.includes(input)) current.wrong.push(input);

			current.attempts++;
		}

		const setComplete =
			current.correct.length === beatCount || current.attempts >= beatCount;
		if (setComplete) {
			this.checkCount++;
			retry = false;

			this.notes[progress].forEach(n => {
				if (!current.correct.includes(n)) {
					n.color = '#fc5130';
				}
			});
		}

		this.emit('updateHelpText');

		const done = progress === this.notes.length - 1 && setComplete;

		return { correct, correctNotes, done, score, retry };
	}

	public retry() {
		this.checks = [];
		this.checkCount = 0;
		this.notes.flat().forEach(n => (n.color = undefined));
		this.emit('updateHelpText');
	}

	public helpText = Vue.extend({
		mixins: [updateLifecycle(this)],
		render: h => {
			return (
				<span class="flex flex-wrap flex-center">
					{this.notes.map(set => (
						<span class="mx-3">
							{set.map(({ formattedPitchClass, color }) => (
								<span style={{ color }} class="mx-2 font-bold">
									{formattedPitchClass}
								</span>
							))}
						</span>
					))}
				</span>
			);
		}
	});
}
