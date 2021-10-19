# mad-expo-core

# Background
This package contains core functionality for Equinors mobile applications such as authentication, feedback and typography. This package is used by our [React Native Expo template](https://github.com/equinor/mad-react-native-expo-template).

# Links
- :inbox_tray: [Bug and feature tracker](https://github.com/equinor/mad-expo-core/projects/1)
- :inbox_tray: [Bug and feature tracker for React Native Expo Template](https://equinor-sds-si.atlassian.net/jira/software/c/projects/GDEXPO/boards/193)

# Prerequisites
To be able to use this package you need to have `expo-cli` installed. To install `expo-cli` follow the [installation guide](https://docs.expo.dev/get-started/installation).

# Installation
If your project is using `npm`, run:
```sh
npm install https://github.com/equinor/mad-expo-core
```
If using `yarn`, run:
```sh
yarn add https://github.com/equinor/mad-expo-core
```

# Development of this package
1. Run
```sh
git clone https://github.com/equinor/mad-expo-core
```
2. Open up a React Native Expo project, we suggest using our [React Native Expo template](https://github.com/equinor/mad-react-native-expo-template).
3. To have a smooth developer experience we use `yalc` to link `mad-expo-core` to the project. To install `yalc`, follow the [installation guide](https://github.com/wclr/yalc#installation).

4. To publish `mad-expo-core` to `yalc` run the following in `mad-expo-core`:
```sh
yalc publish
```
5. To add and link `mad-expo-core` to your project, run:
```sh
yalc add --link mad-expo-core
```
6. The changes you make to `mad-expo-core` will be instantly available in your project.

# Usage

```js
import MadExpoCore from "mad-expo-core";

// ...

const result = await MadExpoCore.multiply(3, 7);
```

# Semantic Commit Messages
> Copied from https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
See how a minor change to your commit message style can make you a better programmer.

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

# License

MIT
