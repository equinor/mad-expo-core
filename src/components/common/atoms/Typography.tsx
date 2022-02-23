import { useFonts } from 'expo-font';
import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

const Typography = (props: {
  variant?: TypographyVariants;
  color?: string;
  light?: boolean;
  medium?: boolean;
  bold?: boolean;
  italic?: boolean;
  size?: number;
  style?: StyleProp<TextStyle>;
  children?: any;
}) => {
  let { variant, color, light, medium, bold, italic, size, style, children } =
    props;
  function validateProps() {
    if ((light && medium) || (light && bold) || (medium && bold))
      throw new Error(
        'You can only choose one of the following: Light, Medium, Bold'
      );
  }
  validateProps();
  const [loaded] = useFonts({
    'Equinor-Bold': require(`../../../assets/fonts/Equinor-Bold.ttf`),
    'Equinor-BoldItalic': require(`../../../assets/fonts/Equinor-BoldItalic.ttf`),
    'Equinor-Italic': require(`../../../assets/fonts/Equinor-Italic.ttf`),
    'Equinor-Light': require(`../../../assets/fonts/Equinor-Light.ttf`),
    'Equinor-LightItalic': require(`../../../assets/fonts/Equinor-LightItalic.ttf`),
    'Equinor-Medium': require(`../../../assets/fonts/Equinor-Medium.ttf`),
    'Equinor-MediumItalic': require(`../../../assets/fonts/Equinor-MediumItalic.ttf`),
    'Equinor-Regular': require(`../../../assets/fonts/Equinor-Regular.ttf`),
  });

  const variants = {
    h1: {
      size: 32,
      type: 'Regular',
    },
    h2: {
      size: 28,
      type: 'Regular',
    },
    h3: {
      size: 24,
      type: 'Regular',
    },
    h4: {
      size: 20,
      type: 'Regular',
    },
    h5: {
      size: 18,
      type: 'Medium',
    },
    h6: {
      size: 16,
      type: 'Medium',
    },
    p: {
      size: 16,
      type: 'Regular',
    },
  };

  if (!variant) variant = 'p';
  if (!size) size = variants[variant].size;

  let fontName = 'Equinor-';
  if (light) fontName += 'Light';
  if (medium) fontName += 'Medium';
  if (bold) fontName += 'Bold';
  if (italic) fontName += 'Italic';
  if (!light && !medium && !bold && !italic) {
    fontName += variants[variant].type;
  }

  if (!loaded) return null;

  return (
    <Text style={[{ fontFamily: fontName, color, fontSize: size }, style]}>
      {children}
    </Text>
  );
};

export default Typography;

export type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
