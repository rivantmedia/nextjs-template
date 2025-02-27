# How to setup our Template

Right now our npx Template CLI have only one template i.e. NextJs Template.

## Prerequisites:

-   NodeJS & NPM Installation

## Downloading and Installation if a project folder had not been yet created

To install the NextJs Template for [@rivantmedia](https://github.com/rivantmedia), run the following command

```bash
$ npx @rivantmedia/next-template@latest
```

Give the desired Project Name as shown:

```bash
? Project name: project-name-of-your-choice
```

Them select any of the package installation manager (use arrow keys to navigate and enter to select):

```bash
? Which installation package manager would you like to choose?
> npm
  pnpm
  yarn
```

Type the following command to run the project:

for NPM

```bash
$ cd [project-name] && npm run dev
```

for PNPM

```bash
$ cd [project-name] && pnpm dev
```

for YARN

```bash
$ cd [project-name] && yarn dev
```

## Downloading and Installation if a project folder had been created

To install the NextJs Template for [@rivantmedia](https://github.com/rivantmedia), run the following command

```bash
$ npx @rivantmedia/next-template@latest
```

Give the "." as Project Name as shown:

```bash
? Project name: .
```

Them select any of the package installation manager (use arrow keys to navigate and enter to select):

```bash
? Which installation package manager would you like to choose?
> npm
  pnpm
  yarn
```

Type the following command to run the project:

for NPM

```bash
$ npm run dev
```

for PNPM

```bash
$ pnpm dev
```

for YARN

```bash
$ yarn dev
```

# How to add more Templates

-   Right now our npx Template CLI have only one template i.e. NextJs Template.
-   To add more templates, Create a template of your choice with everything you need.
-   Make sure that template does not have `package-lock.json` or `yarn.lock` or `pnpm-lock.yaml`.
-   Then, you need to add that template in the `template` folder.
-   After, this commit and publish the package.
-   You are now able to select the template of your choice to download and install.

## How to select a template if multiple template are present:

```bash
$ npx @rivantmedia/next-template@latest
```

Now you can select any of the template (use arrow keys to navigate and enter to select):

```bash
? Which template would you like to choose?
> nextjs-ts-rivant-template
  nextjs-js-rivant-template
  react-js-rivant-template
  react-ts-rivant-template
```

Give the desired Project Name as shown:

```bash
? Project name: project-name-of-your-choice
```

Them select any of the package installation manager (use arrow keys to navigate and enter to select):

```bash
? Which installation package manager would you like to choose?
> npm
  pnpm
  yarn
```

### Congratulations! you are ready to use this template
