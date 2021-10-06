import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { isArray, isObject } from 'lodash';
import * as colors from '../../../stylesheets/colors';

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  oddTableRow: {
    backgroundColor: colors.GRAY_4,
  },
  tableHeaderRow: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_1,
  },
  tableCell: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 4,
    paddingBottom: 4,
  },
  headerText: {
    color: colors.BLACK_GRAY,
    fontWeight: 'bold',
  },
  keyText: {
    color: colors.GRAY_1,
    fontSize: 12,
    fontWeight: '400',
  },
  valueText: {
    fontSize: 12,
  },
});

const DetailsTable = (props: { record: Object | Array<any> }) => {
  const { record } = props;
  const printValue = (val: any) => {
    if (isArray(val)) {
      return val.length;
    }
    if (isObject(val)) {
      return JSON.stringify(val);
    }
    return val && val.toString();
  };

  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeaderRow]}>
          <View style={styles.tableCell}>
            <Text style={styles.headerText}>Property</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.headerText}>Value</Text>
          </View>
        </View>
        {Object.keys(record)
          .filter((k) => !k.startsWith('_'))
          .map((k, i) => (
            <View
              key={k}
              style={[styles.tableRow, i % 2 === 0 && styles.oddTableRow]}
            >
              <View style={styles.tableCell}>
                <Text style={styles.keyText}>{k}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.valueText}>
                  {
                    printValue(
                      record[k]
                    ) /*TODO this needs a rework in order to work with typescript*/
                  }
                </Text>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default DetailsTable;
