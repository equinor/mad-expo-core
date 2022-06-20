import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Typography from '../atoms/Typography';
import * as Linking from 'expo-linking';
import Colors from 'src/stylesheets/colors';

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.WHITE,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },
  bannerText: {
    fontSize: 16,
  },
  iconContainer: {
    borderRadius: 90,
    width: 40,
    height: 40,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Banner = (props: {
  icon?: string;
  bannerType: 'negative' | 'positive';
  maxNonExpandedHeight: number;
  maxExpandedHeight: number;
  text?: string;
  url?: string;
  onDismiss: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { text, viewStyle, textStyle } = props;
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.bannerContainer,
        {
          maxHeight: expanded
            ? props.maxExpandedHeight
            : props.maxNonExpandedHeight,
        },
        viewStyle,
      ])}
      onPress={() => setExpanded(!expanded)}
    >
      <View
        style={StyleSheet.flatten([
          styles.bannerContainer,
          { backgroundColor: 'transparent', flex: 1 },
        ])}
      >
        <View
          style={StyleSheet.flatten([
            styles.iconContainer,
            {
              backgroundColor:
                props.bannerType === 'negative' ? Colors.PINK_LIGHT : Colors.WHITE_GRAY,
            },
          ])}
        >
          <MaterialCommunityIcons
            name="information-variant"
            size={24}
            color={props.bannerType === 'negative' ? Colors.RED_LOGO : Colors.EQUINOR_PRIMARY}
          />
        </View>
        <Typography
          numberOfLines={expanded ? 20 : 3}
          size={styles.bannerText.fontSize}
          style={StyleSheet.flatten([
            { paddingLeft: 12, flex: 1, lineHeight: 19, flexWrap: 'wrap' },
            textStyle,
          ])}
        >
          {text}
        </Typography>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        { props.url &&
        <TouchableOpacity onPress={() => Linking.openURL(props.url)} style={{marginRight: 16}}>
          <MaterialCommunityIcons name="link-variant" size={24} color={Colors.EQUINOR_PRIMARY} />
        </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => props.onDismiss()}>
          <MaterialCommunityIcons name="close" size={24} color={Colors.EQUINOR_PRIMARY} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

Banner.defaultProps = {
  text: '',
  icon: 'information-variant',
  bannerType: 'negative',
  viewStyle: {},
  textStyle: {},
};

export default Banner;
