#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import process from "process";

import createDirectoryContents from "./createDirectoryContents.js";
const CURR_DIR = process.cwd();

const __dirname = dirname(fileURLToPath(import.meta.url));

const templates = fs.readdirSync(`${__dirname}/template`);
const isThereMoreTemplate = templates.length > 1;

const QUESTIONS = isThereMoreTemplate
	? [
			{
				name: "template-choice",
				type: "list",
				message: "Which template would you like to choose?",
				choices: templates
			},
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
				message:
					"Which installation package manager would you like to choose?",
				choices: ["npm", "pnpm", "yarn"]
			}
	  ]
	: [
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
				message:
					"Which installation package manager would you like to choose?",
				choices: ["npm", "pnpm", "yarn"]
			}
	  ];

inquirer.prompt(QUESTIONS).then((answers) => {
	const packageChoice = answers["package-choice"];
	const projectName = answers["project-name"];
	const template = isThereMoreTemplate
		? answers["template-choice"]
		: templates[0];
	const templatePath = `${__dirname}/template/${template}`;

	if (projectName !== ".") fs.mkdirSync(`${CURR_DIR}/${projectName}`);

	createDirectoryContents(templatePath, projectName, packageChoice);
});
