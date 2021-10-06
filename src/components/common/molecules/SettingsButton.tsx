import React from 'react';
import IconButton from '../atoms/IconButton';

const SettingsButton = (props: { navigation: any }) => (
  <IconButton
    name="settings"
    onPress={() => props.navigation.navigate('Settings')}
    style={{ padding: 16 }}
  />
);

export default SettingsButton;
