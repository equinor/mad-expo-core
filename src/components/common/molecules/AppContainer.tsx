import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  Platform,
  View,
} from "react-native";

export default function AppContainer(props: {
  children: JSX.Element;
  imageSource: ImageSourcePropType;
}) {
  const App = () => (
    <View style={{ height: "100%", maxWidth: 800 }}>{props.children}</View>
  );

  if (Platform.OS === "web") {
    return (
      <ImageBackground style={{ flex: 1 }} source={props.imageSource}>
        <App />
      </ImageBackground>
    );
  } else {
    return <App />;
  }
}
