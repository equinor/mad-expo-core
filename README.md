# mad-expo-core

# Background
This package contains core functionality for Equinors mobile applications such as authentication, feedback and typography. This package is used by our [React Native Expo template](https://github.com/equinor/mad-react-native-expo-template).

# Links
- :inbox_tray: [Bug and feature tracker](https://github.com/equinor/mad-expo-core/projects/1)
- :inbox_tray: [Bug and feature tracker for React Native Expo Template](https://equinor-sds-si.atlassian.net/jira/software/c/projects/GDEXPO/boards/193)

# How to use this package
And your project is using `npm`, run:
```sh
npm install https://github.com/equinor/mad-expo-core
```
Else if your project is using `yarn`, run:
```sh
yarn install https://github.com/equinor/mad-expo-core
```
# Development of this package
1. Clone this package into the same folder containing your project repository:
```sh
git clone https://github.com/equinor/mad-expo-core
```
2. To have a smooth developer experience we use `yalc` to keep track of the local version of `mad-expo-core`. To install `yalc`, follow this [installation procedure](https://github.com/wclr/yalc#installation).

3. Add the following script to your `package.json` in your project (replace `project-name` with the name of your project):
```sh
{
  "scripts": {
    "refresh-core": "cd ../mad-expo-core && yalc publish && cd ../project-name && yalc add mad-expo-core"
  }
}
```

If using Expo and React Native in your project you can add `&& expo start` at the end of your script to make an even better developer experience which makes your script start up the Expo server after refreshing your local changes to `mad-expo-core`:

```sh
{
  "scripts": {
    "refresh-core": "cd ../mad-expo-core && yalc publish && cd ../project-name && yalc add mad-expo-core && expo start"
  }
}
```

4. After making a change to your local `mad-expo-core` package, run the following in your project terminal to be able to use the them in your project:
If using npm:
```sh
npm run refresh-core
```
If using yarn:
```sh
yarn run refresh-core
```

## Usage

```js
import MadExpoCore from "mad-expo-core";

// ...

const result = await MadExpoCore.multiply(3, 7);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
