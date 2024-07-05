import * as fs from "fs";
import process from "process";
import { execSync } from "child_process";

const CURR_DIR = process.cwd();

const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: "inherit" });
	} catch (error) {
		console.error(`Failed to execute ${command}`, error);
	}
};

const createDirectoryContents = (
	templatePath,
	newProjectPath,
	installPackage
) => {
	function start(templatePath, newProjectPath) {
		const isNameDot = newProjectPath === ".";

		const filesToCreate = fs.readdirSync(templatePath);

		filesToCreate.forEach((file) => {
			const origFilePath = `${templatePath}/${file}`;

			// get stats about the current file
			const stats = fs.statSync(origFilePath);

			if (stats.isFile()) {
				const contents = fs.readFileSync(origFilePath, "utf8");

				// Rename
				if (file === "package.json") {
					const objectData = JSON.parse(contents);
					const ifNameIsDot = CURR_DIR.split("\\").at(
						CURR_DIR.split("\\").length - 1
					);

					const newObjectData = {
						...objectData,
						name: isNameDot ? ifNameIsDot : newProjectPath
					};
					const newContents = JSON.stringify(newObjectData);
					const writePath = isNameDot
						? `${CURR_DIR}/${file}`
						: `${CURR_DIR}/${newProjectPath}/${file}`;
					fs.writeFileSync(writePath, newContents, "utf8");
				} else {
					const writePath = isNameDot
						? `${CURR_DIR}/${file}`
						: `${CURR_DIR}/${newProjectPath}/${file}`;
					fs.writeFileSync(writePath, contents, "utf8");
				}
			} else if (stats.isDirectory()) {
				fs.mkdirSync(
					isNameDot
						? `${CURR_DIR}/${file}`
						: `${CURR_DIR}/${newProjectPath}/${file}`
				);

				// recursive call
				start(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
			}
		});
	}

	console.log("Downloading Rivant Media Next Template");
	start(templatePath, newProjectPath);

	console.log("Installing Dependencies");
	const installDepsCommand = `cd ${newProjectPath} && ${installPackage} install`;
	const installDeps = runCommand(installDepsCommand);
	if (!installDeps) process.exit(-1);

	console.log(
		"Congratulations! You are ready. Follow the following commands to start"
	);
	console.log(`cd ${newProjectPath} && ${installPackage} dev`);
};

export default createDirectoryContents;
