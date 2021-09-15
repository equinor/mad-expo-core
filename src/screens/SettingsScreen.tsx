import { ScrollView, TextInput, View } from "react-native";
import { Button, Typography } from "../components/common";
import React from "react";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GREEN_LIGHT } from "../stylesheets/colors";

const SettingsScreen = (props: {navigation:any}) => {
  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        <Setting icon="app-settings-alt" title="Onboarding" route="Onboarding" navigation={props.navigation} />
        <Setting icon="feedback" title="Feedback" route="Feedback" navigation={props.navigation} />
      </View>
    </ScrollView>
  );
};

const Setting = (props:{icon, title:string, route:string, navigation:any}) => {
    return <MaterialIcons.Button name={props.icon} onPress={() => props.navigation.navigate(props.route)} backgroundColor="transparent" color="#007079" underlayColor={GREEN_LIGHT} style={{padding: 12}}>
        <Typography medium color="#007079">{props.title}</Typography>
    </MaterialIcons.Button>
}
export default SettingsScreen;
