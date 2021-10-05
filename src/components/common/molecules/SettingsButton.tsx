import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../atoms/IconButton';

const SettingsButton = (props: { navigation: any }) => {
  return (
    // <View style={styles.container}>
    <IconButton
      name="settings"
      onPress={() => props.navigation.navigate('Settings')}
      size={5}
    />
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'green',
//     //padding: 20,
//   },
// });

export default SettingsButton;
