import React, { useEffect } from 'react';

import { useState } from 'react';
import ChangeLog from '../components/common/organisms/ChangeLog';
import * as mockData from '../resources/mock-data.json';


const ReleaseNoteScreen = (props: {
  name: string;
  version: string;
  environment: 'dev' | 'test' | 'qa' | 'prod';
  navigation: any;
  demoMode?: boolean;
  languageCode?: string;
}) => {
  const [releaseNote, setReleaseNote] = useState(Object);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchChangelog = (() => {
      const environment = props.environment === 'prod' ? `` : `${props.environment}/`;
      if(props.demoMode){
        setReleaseNote(mockData.ReleaseNotes);
        setFetching(false);
      } else{
          fetch(
            `https://api.statoil.com/app/mad/${environment}api/v1/ReleaseNote/${props.name}/${props.version}`
          )
            .then((res) => res.json().then((data) => {
              setReleaseNote(data);
              setFetching(false);
            }))
            .catch((error) => {
              setError(error);
              setFetching(false);
              }
            );
      }
    });

    fetchChangelog();
  }, []);

  if(error){ 
    props.navigation.navigate('Root');
  };

  return (
    <ChangeLog releaseNote={releaseNote} fetching={fetching} affirm={() => props.navigation.navigate('Root')} />
  );
};

export default ReleaseNoteScreen;
