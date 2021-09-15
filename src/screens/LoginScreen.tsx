import React from 'react';
import { makeRedirectUri } from "expo-auth-session";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "../components/authentication/LoginButton";


export default function LoginScreen(props:{route:{params:{environmentConstants:{CLIENT_ID:string}}}, navigation:any}) {
    return (
      <View style={styles.container}>
        <LoginButton environmentConstants={props.route.params.environmentConstants} navigation={props.navigation}/>
        <Text>{makeRedirectUri({
          scheme: 'mad-expo-template'
          })}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });