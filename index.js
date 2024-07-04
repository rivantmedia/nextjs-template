#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import process from "process";

import createDirectoryContents from "./createDirectoryContents.js";
const CURR_DIR = process.cwd();

const __dirname = dirname(fileURLToPath(import.meta.url));

const template = fs.readdirSync(`${__dirname}/template`)[0];

const QUESTIONS = [
	{
		name: "project-name",
		type: "input",
		message: "Project name:",
		validate: function (input) {
			if (input === ".") return true;
			if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
			else
				return "Project name may only include letters, numbers, underscores and hashes.";
		}
	},
	{
		name: "package-choice",
		type: "list",
		message: "Which installation package manager would you like to choose?",
		choices: ["npm", "pnpm", "yarn"]
	}
];

inquirer.prompt(QUESTIONS).then((answers) => {
	const packageChoice = answers["package-choice"];
	const projectName = answers["project-name"];
	const templatePath = `${__dirname}/template/${template}`;

	if (projectName !== ".") fs.mkdirSync(`${CURR_DIR}/${projectName}`);

	createDirectoryContents(templatePath, projectName, packageChoice);
});
