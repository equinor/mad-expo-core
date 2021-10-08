import React from 'react';
import IconButton from '../atoms/IconButton';

const SettingsButton = (props: { navigation: any }) => {
  return (
    <IconButton
      name="settings"
      onPress={() => props.navigation.navigate('Settings')}
      style={{ marginRight: 16 }}
    />
  );
};

export default SettingsButton;
