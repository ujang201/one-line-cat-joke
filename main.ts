// The One-Line Cat Joke That Lands — u-aldy998
// SPDX-License-Identifier: MIT
//
// One joke, one line, no padding. The program assembles the joke from
// three named parts — the habit, the reframe, and the verdict — so the
// setup and the turn stay visible in the code, then checks the result
// against the gate (1-200 characters, a single line) before writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// --- the joke, in its three beats ---------------------------------------
// Beat 1 (the habit everyone recognises): the cat knocks things off.
// Beat 2 (the reframe): it is not rudeness, it is a job.
// Beat 3 (the verdict): everything I own keeps failing that job's test.
const habit = "My cat doesn't knock things off the table to be rude";
const reframe = "she's quality control";
const verdict = "and so far everything I own has failed inspection";

function buildJoke(): string {
  // Em-dash joins the reframe to the habit; a comma carries the verdict.
  // No trailing newline: the gate counts every character in the file.
  return `${habit} — ${reframe}, ${verdict}.`;
}

function checkJoke(joke: string): void {
  if (joke.length < 1 || joke.length > 200) {
    throw new Error(`joke is ${joke.length} characters, must be 1-200`);
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (joke.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (/\s{2,}/.test(joke)) {
    throw new Error("joke must not contain double spaces");
  }
  if (!/cat/i.test(joke)) {
    throw new Error("joke must be about a cat");
  }
}

function main(): void {
  const joke = buildJoke();
  checkJoke(joke);
  const outPath = resolve(process.env.OUTPUT_PATH ?? "/output/entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, joke, "utf8");
}

main();
