import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';
import Colors from '../../../stylesheets/colors';
import * as showdown from 'showdown';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { getDateFromIsoString, getShortDate, Typography } from 'mad-expo-core';
import type { Release } from '../../../screens/ReleaseNoteScreen';

const featureTitle = "What's new";
const affirmText = 'OK';
const converter = new showdown.Converter();
const systemFonts = [
  ...defaultSystemFonts,
  'Equinor-Regular',
  'Equinor-Medium',
];

const ChangeLog = (props: {
  release: Release;
  fetching: boolean;
  affirm: any;
}) => {
  const renderChangeLog = (release: Release) => {
    const [width, setWidth] = useState(0);

    const { changelogItem, versionHeader, subtitleHeader } = styles;
    const html = { html: converter.makeHtml(release.releaseNote) };
    const date = getDateFromIsoString(release.releaseDate);
    const shortDate = getShortDate(date);

    return (
      <ScrollView style={changelogItem}>
        <Typography style={versionHeader} medium={true}>
          {release.version}
        </Typography>
        <Typography style={subtitleHeader} medium={true}>
          {shortDate}
        </Typography>
        <View
          onLayout={(event) => {
            let { width } = event.nativeEvent.layout;
            setWidth(width);
          }}
        >
          <RenderHtml
            contentWidth={width}
            source={html}
            systemFonts={systemFonts}
            tagsStyles={{
              li: {
                marginBottom: 10,
                fontFamily: 'Equinor-Medium',
                fontSize: 18,
                color: Colors.GRAY_1,
              },
            }}
          />
        </View>
      </ScrollView>
    );
  };

  const { container, footer, titleHeader } = styles;

  const { release, affirm, fetching } = props;

  if (fetching) {
    return <Spinner />;
  }

  return (
    <View style={container}>
      <Typography style={titleHeader} medium variant="h4">
        {featureTitle}
      </Typography>
      {renderChangeLog(release)}
      <View style={footer}>
        <Button title={affirmText} onPress={affirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    backgroundColor: Colors.GRAY_4,
  },
  footer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.GRAY_2,
    borderTopWidth: 0.5,
  },
  titleHeader: {
    marginVertical: 15,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 30,
    color: Colors.GRAY_1,
  },
  versionHeader: {
    marginVertical: 15,
    fontWeight: '500',
    fontSize: 36,
    color: Colors.GRAY_1,
  },
  subtitleHeader: {
    fontSize: 18,
    marginVertical: 5,
    color: Colors.GRAY_1,
  },
  changelogItem: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default ChangeLog;
