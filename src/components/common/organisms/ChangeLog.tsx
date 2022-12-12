import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';
import Colors from "../../../stylesheets/colors";
import * as showdown from "showdown";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html"
import moment from 'moment';
import { Typography } from 'mad-expo-core';


const featureTitle = "What's new";
const affirmText = 'OK';
const converter = new showdown.Converter();
converter.setOption("tables", true);
converter.setOption("emoji", true);

const systemFonts = [...defaultSystemFonts, "Equinor-Medium"]

const ChangeLog = (props: {
    releaseNote: string;
    fetching: boolean;
    affirm: any;
  }) => {

  const renderChangeLog = (release : any) => {
    const { changelogItem, versionHeader, subtitleHeader } = styles;
    const html = {html: converter.makeHtml(release.releaseNote)};
    console.log(html)
    const date = moment(release.releaseDate).format('MMM DD, YYYY');
    return (
      <ScrollView style={changelogItem}>
        <Typography style={versionHeader} bold={true}>{release.version}</Typography>
        <Typography style={subtitleHeader} medium={true}>{date}</Typography>
        <View>
          <RenderHtml
            contentWidth={useWindowDimensions().width}
            source={html}
            systemFonts={systemFonts}
            tagsStyles={{li: {marginBottom: 10, fontFamily: 'Equinor-Medium', fontSize: 18, color: Colors.GRAY_1}}}
          />
        </View>
      </ScrollView>
    );
  }

  
  const { container, footer, titleHeader} = styles;

  const { releaseNote, affirm, fetching } = props;

  if (fetching) {
    return <Spinner />;
  }

  return (
    <View style={container}>
      <Typography style={titleHeader} medium={true}>{featureTitle}</Typography>
      {renderChangeLog(releaseNote)}
      <View style={footer}>
        <Button
          title={affirmText}
          onPress={affirm}
        />
      </View>
    </View>
  );
}


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
    fontSize: 24,
    color: Colors.GRAY_1,
  },
  subtitleHeader: {
    fontSize: 18,
    marginVertical: 5,
    color: Colors.GRAY_1,
  },
  changelogText: {
    fontSize: 16,
    marginVertical: 1,
    color: Colors.GRAY_1,
    fontFamily: "Equinor-Regular"
  },
  bullet: {
    fontSize: 16,
    marginVertical: 1,
    marginRight: 5,
    color: Colors.GRAY_1,
  },
  bulletList: {
    flexDirection: 'row',
  },
  changelogItem: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default ChangeLog;
