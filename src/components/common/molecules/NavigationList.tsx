import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../stylesheets/colors';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GRAY,
  },
  itemContainer: {
    backgroundColor: 'white',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: Colors.BLACK_LIGHT,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: Colors.BLACK_GRAY,
    flex: 1,
    paddingHorizontal: 15,
  },
});

/**
 * @deprecated
 * Please transition to `@equinor/mad-components`.
 * If something is preventing you from making the transition,
 * please create an issue here: https://github.com/equinor/mad/issues
 */
const NavigationList = (props: {
  items: Array<{ key: string; label: string; route: string; params: Object }>;
  fetching: boolean;
  navigation?: { navigate: (route: string, params: Object) => void };
  onRefresh?: () => void;
}) => {
  const { items, fetching, navigation, onRefresh } = props;
  const handleClick = (index: number) => {
    const item = items[index];
    navigation?.navigate(item.route, item.params);
  };

  const renderItem = (props: {
    item: { key: string; label: string; route: string; params: Object };
    index: number;
  }) => (
    <TouchableOpacity onPress={() => handleClick(props.index)}>
      <View style={styles.itemContainer}>
        <Text style={styles.textStyle}>{props.item.label}</Text>
        <MaterialIcons name="chevron-right" style={styles.icon} size={26} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        onRefresh && (
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
        )
      }
    >
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

export default NavigationList;
