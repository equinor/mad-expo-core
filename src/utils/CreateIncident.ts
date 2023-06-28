import { authenticateSilently } from 'mad-expo-core';
import { LayoutAnimation } from 'react-native';

type IncidentData = {
  callerEmail: string | undefined;
  title: string;
  description: string;
};

export const createIncident = (props: {
  data: IncidentData;
  scopes: string[];
  apiBaseUrl: string;
  product: string;
}): Promise<Response> => {
  return authenticateSilently(props.scopes)
    .then((r) => fetch(`${props.apiBaseUrl}/ServiceNow/apps/${props.product}/incidents`, {
        method: "POST",
        body: JSON.stringify(props.data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${r?.accessToken}`
        }
      })
        .then((response) => {
          LayoutAnimation.configureNext({
            duration: 500,
            update: {
              type: LayoutAnimation.Types.easeInEaseOut
            },
            create: {
              type: LayoutAnimation.Types.easeInEaseOut,
              property: LayoutAnimation.Properties.opacity
            }
          });
          return response;
        })
        .catch((error) => {
          console.error(error);
          return error;
        })
    )
    .catch((error) => {
      throw error;
    })
};
