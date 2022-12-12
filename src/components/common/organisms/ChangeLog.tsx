import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';
import Colors from "../../../stylesheets/colors";
import Markdown from 'react-native-markdown-package';

const featureTitle = "What's new";
const affirmText = 'OK';

const ChangeLog = (props: {
    releaseNote: string;
    fetching: boolean;
    affirm: any;
  }) => {

  const renderChangeLog = (release : any) => {
    const { changelogItem, titleHeader, subtitleHeader, changelogText } = styles;

    return (
      <ScrollView style={changelogItem}>
        <Text style={titleHeader}>{release.version}</Text>
        <Text style={subtitleHeader}>{release.modified}</Text>
        <View style={{ margin: 5, marginLeft: 10 }}>
          <Markdown style={changelogText}>{release.releaseNote}</Markdown>
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
      <Text style={titleHeader}>{featureTitle}</Text>
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
  subtitleHeader: {
    fontSize: 20,
    marginVertical: 5,
    color: Colors.GRAY_1,
  },
  changelogText: {
    fontSize: 16,
    marginVertical: 1,
    color: Colors.GRAY_1,
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
