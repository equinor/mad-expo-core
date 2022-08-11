import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Banner from '../molecules/Banner';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ServiceMessage = (props: {
  serviceName: string;
  environment: 'dev' | 'test' | 'qa' | 'prod';
}) => {
  const [serviceMessage, setServiceMessage] = useState<
    ServiceMessage | 'REQUEST FAILED'
  >(null);
  const safeAreaInsets = useSafeAreaInsets();

  const displayBanner = () => {
    if (serviceMessage === 'REQUEST FAILED')
      return (
        <>
        <View>

          <Banner
            viewStyle={styles.bannerViewStyle}
            maxExpandedHeight={400}
            maxNonExpandedHeight={80 + safeAreaInsets.top}
            text={'Could not retrieve service message'}
            onDismiss={() => setServiceMessage(null)}
          />
        </View>
        </>
      );
    if (!serviceMessage || !serviceMessage.status) return <></>;
    return (
      <>
      <View>
        <Banner
          viewStyle={StyleSheet.flatten([
            styles.bannerViewStyle,
            {
              paddingTop: safeAreaInsets.top,
              minHeight: 80 + safeAreaInsets.top,
            },
          ])}
          maxExpandedHeight={400}
          maxNonExpandedHeight={80 + safeAreaInsets.top}
          text={serviceMessage.message}
          onDismiss={() => setServiceMessage(null)}
          url={serviceMessage.urlString}
        />
        </View>
      </>
    );
  };

  useEffect(() => {
    const environment: string = props.environment.toLowerCase() === "prod" ? `` : `${props.environment}/`;
    fetch(
      `https://api.statoil.com/app/mad/${environment}api/v1/ServiceMessage/${props.serviceName}`
    )
      .then((res) => res.json().then((data) => setServiceMessage(data)))
      .catch(() => setServiceMessage('REQUEST FAILED'));
  }, []);
  return <>{displayBanner()}</>;
};

const styles = StyleSheet.create({
  bannerViewStyle: {
    zIndex: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,

  },
});

type ServiceMessage = {
  status: boolean;
  serviceName: string;
  alertName: string;
  message: string;
  urlString: string | null;
  fromDate: string | null;
  toDate: string | null;
};

export default ServiceMessage;
