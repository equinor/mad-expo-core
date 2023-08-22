import React from 'react';
import IconButton from '../atoms/IconButton';

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
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
