import React, { useEffect, useRef } from 'react';
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
  const [serviceMessageShown, setServiceMessageShown] = useState<boolean>(true);
  const safeAreaInsets = useSafeAreaInsets();

  const lastInterval = useRef<NodeJS.Timer>();

  useEffect(() => {
    function fetchServiceMessage(environment: string) {
      fetch(
        `https://api.statoil.com/app/mad/${environment}api/v1/ServiceMessage/${props.serviceName}`
      )
        .then((res) =>
          res.json().then((data: ServiceMessage) => {
            if (
              !serviceMessage ||
              (serviceMessage !== 'REQUEST FAILED' &&
                data.alertName !== serviceMessage.alertName)
            ) {
              setServiceMessage(data);
              setServiceMessageShown(true);
            }
          })
        )
        .catch(() => setServiceMessage('REQUEST FAILED'));
    }

    const environment: string =
      props.environment.toLowerCase() === 'prod' ? `` : `${props.environment}/`;

    if (!lastInterval.current) fetchServiceMessage(environment);
    if (lastInterval.current) clearInterval(lastInterval.current);
    lastInterval.current = setInterval(() => {
      fetchServiceMessage(environment);
    }, 300000);

    return () => {
      clearInterval(lastInterval.current);
    };
  }, [serviceMessage]);

  const displayBanner = () => {
    if (serviceMessage === 'REQUEST FAILED')
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
              text={'Could not retrieve service message'}
              onDismiss={() => setServiceMessageShown(false)}
            />
          </View>
        </>
      );
    if (!serviceMessage || !serviceMessage.status || !serviceMessageShown)
      return <></>;
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
            onDismiss={() => setServiceMessageShown(false)}
            url={serviceMessage.urlString}
          />
        </View>
      </>
    );
  };

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
