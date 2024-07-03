#!/usr/bin/env node

import { execSync } from "child_process";

const runCommand = (command: string) => {
	try {
		execSync(`${command}`, { stdio: "inherit" });
	} catch (e) {
		console.log(`Failed to execute ${command}`, e);
		return false;
	}
	return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/rivantmedia/nextjs-template ${repoName}`;
const installDepsCommand = `cd ${repoName} && pnpm add`;

console.log(`Cloning the repositry with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log(
	"Congratulations! You are ready. Follow the following commands to start"
);
console.log(`cd ${repoName} && pnpm dev`);
