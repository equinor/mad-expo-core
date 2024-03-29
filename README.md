# Note: We are slowly transitioning to the new monorepo

Please do not make any new changes to this repository unless it is critical.

# mad-expo-core

# Background

This package contains core functionality for development of Equinors Mobile Applications like authentication, feedback and typography. This package is used by our [React Native Expo template](https://github.com/equinor/mad-react-native-expo-template).

# Links

- :inbox_tray: [Bug and feature tracker](https://github.com/orgs/equinor/projects/87/views/10)
- :page_facing_up: [Documentation](/docs/)

# Availability

Currently you can only find this package on GitHub.

# Prerequisites

To be able to use this package you need to have `expo-cli` installed. Follow the [installation guide](https://docs.expo.dev/get-started/installation).

# Installation

## Add the main branch to your project

If using `npm`, run:

```sh
npm install git+https://github.com/equinor/mad-expo-core
```

If using `yarn`, run:

```sh
yarn add git+https://github.com/equinor/mad-expo-core
```

## Add a specific version(branch, commit, release or tag) to your project

Replace `{commithash-or-tag-or-branch}` with a commit hash, tag or branch name. For `npm`, run:

```sh
npm install git+https://github.com/equinor/mad-expo-core#{commit-hash-or-tag-or-branch-name}
```

or if using `yarn`, run:

```sh
yarn add git+https://github.com/equinor/mad-expo-core#{commit-hash-or-tag-or-branch-name}
```

# Development of this package

1. Clone `mad-expo-core` into the same folder containing your React Native Expo project. We suggest using our [React Native Expo template](https://github.com/equinor/mad-react-native-expo-template):

```sh
git clone https://github.com/equinor/mad-expo-core
```

The folder structure could look like this:

```
/Users/Adam/mad-expo-core
/Users/Adam/mad-react-native-expo-template
```

2. To have a smooth developer experience we use `yalc` to link `mad-expo-core` to the project. To install `yalc` in your project follow the [installation guide](https://github.com/wclr/yalc#installation).
3. Add the `refresh-core`-script to `package.json`in your React Native Expo project. Remember to replace the `{projectName}` with your project name:

```json5
{
  scripts: {
    'refresh-core': 'cd ../mad-expo-core && yalc publish && cd ../{projectName} && yalc add mad-expo-core && expo start',
  },
}
```

4. Make changes to `mad-expo-core`. _Make sure to update documentation too!_
5. If you added the `refresh-core`-script you can skip step 6 and 7. Run the following in your project to refresh `mad-expo-core`, for `npm` run:

```sh
npm run refresh-core
```

or if using `yarn`, run:

```sh
yarn run refresh-core
```

6. If you didn't add the `refresh-core`-script you need to publish `mad-expo-core` to `yalc`. Run the following in `mad-expo-core`:

```sh
yalc publish
```

7. You then need to add `mad-expo-core` to your project, run the following in your project folder:

```sh
yalc add mad-expo-core
```

After each change of `mad-expo-core` you either have to follow step `5` or `6 and 7` to be able to test while you develop this package.

# Usage

```js
import MadExpoCore from 'mad-expo-core';

// ...

const result = await MadExpoCore.multiply(3, 7);
```

# Automatic generation of changelog

We use standard-version, a utility for versioning using [semver](https://semver.org/) and CHANGELOG generation powered by [Conventional Commits](https://conventionalcommits.org).

# Semantic Commit Messages

> Copied from https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
> See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

## Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html

# Release

We use [standard-version](https://github.com/conventional-changelog/standard-version) to:

- `Bump` the version number
- Generate a `changelog` based on the commits since last release
- Create a new `tag` with the new version number

by running the following if you use `npm`:

```sh
npm run release
```

or if using `yarn`, run:

```sh
yarn run release
```

# License

MIT
