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
  scopes: string[];
  navigation: any;
  versionStorageKey: string;
  redirectRoute: string;
  demoMode?: boolean;
  languageCode?: string;
}) => {
  const [releaseNote, setReleaseNote] = useState(Object);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  const storeData = async (value: string | null) => {
    try {
      if (value) {
        await AsyncStorage.setItem(props.versionStorageKey, value);
      } else {
        await AsyncStorage.removeItem(props.versionStorageKey);
      }
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {

    const fetchChangelog = (async () => {

      try {
        const version = await AsyncStorage.getItem(props.versionStorageKey);
        if (version === props.version) {
          setFetching(false)
          return;
        }
      } catch (e) {
        // error reading value
      }

      const environment = props.environment === 'prod' ? `` : `${props.environment}/`;
      if(props.demoMode){
        setReleaseNote(mockData.ReleaseNotes);
        setFetching(false);
      } else{
          authenticateSilently(props.scopes).then(response => {
            fetch(`https://api.statoil.com/app/mad/${environment}api/v1.1/ReleaseNote/${props.name}/${props.version}`, { 
            method: 'GET', 
            headers: new Headers({
                'Authorization': response ? `Bearer ${response.accessToken}` : "", 
            }),
          })
            .then((res) => res.json().then((data) => {
              setReleaseNote(data);
              setFetching(false);
            })).catch((error) => {
              setError(error);
              setFetching(false);
            })
          }).catch((error) => {
            setError(error);
            setFetching(false);
            }
          );
      }
    });
    
    fetchChangelog();
  }, []);
  if(error || (!fetching && !releaseNote.releaseNote)){ 
    props.navigation.navigate(props.redirectRoute);
    return <></>;
  } else {
    return (
      <ChangeLog releaseNote={releaseNote} fetching={fetching} affirm={() => { 
        storeData(props.version);
        props.navigation.navigate(props.redirectRoute)
      }} />
    );
  }
};

export default ReleaseNoteScreen;
