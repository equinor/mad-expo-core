import { ScrollView, View } from "react-native";
import { Typography } from "../components/common";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GREEN_LIGHT } from "../stylesheets/colors";

const SettingsScreen = (props: {route: {params: {config: Array<{icon: string, title: string, route: string}>}}, navigation:any}) => {
  const config=props.route.params.config;
  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        {config.map((item) => <Setting icon={item.icon} title={item.title} route={item.route} navigation={props.navigation}/>)}
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
