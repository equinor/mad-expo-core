import { authenticateSilently } from '../services/auth';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';
import ChangeLog from '../components/common/organisms/ChangeLog';
import * as mockData from '../resources/mock-data.json';


const ReleaseNoteScreen = (props: {
  name: string;
  version: string;
  environment: 'dev' | 'test' | 'qa' | 'prod';
  scope: string;
  navigation: any;
  versionStorageKey: string;
  demoMode?: boolean;
  languageCode?: string;
}) => {
  const [releaseNote, setReleaseNote] = useState(Object);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  const storeData = async (value: string | null) => {
    try {
      if (value) {
        await AsyncStorage.setItem("version", value);
      } else {
        await AsyncStorage.removeItem("version");
      }
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {

    const checkVersion = async () => {
      try {
        const version = await AsyncStorage.getItem("version");
        if (version === props.version) {
          props.navigation.navigate('Root');
        }
      } catch (e) {
        // error reading value
      }
    };

    const fetchChangelog = (() => {
      const environment = props.environment === 'prod' ? `` : `${props.environment}/`;
      if(props.demoMode){
        setReleaseNote(mockData.ReleaseNotes);
        setFetching(false);
      } else{
          authenticateSilently([props.scope]).then(response => {
            fetch(`https://api.statoil.com/app/mad/${environment}api/v1/ReleaseNote/${props.name}/${props.version}`, { 
            method: 'GET', 
            headers: new Headers({
                'Authorization': response ? `Bearer ${response.accessToken}` : "", 
            }),
          })
            .then((res) => res.json().then((data) => {
              setReleaseNote(data);
              setFetching(false);
            }))
          }).catch((error) => {
            setError(error);
            setFetching(false);
            }
          );
      }
    });
    
    checkVersion();
    fetchChangelog();
  }, []);
  if(error){ 
    props.navigation.navigate('Root');
  };

  return (
    <ChangeLog releaseNote={releaseNote} fetching={fetching} affirm={() => { 
      storeData(props.version);
      props.navigation.navigate('Root')
    }} />
  );
};

export default ReleaseNoteScreen;
