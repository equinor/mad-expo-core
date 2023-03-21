import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Typography from './Typography';

function Accordion(props: {
  title: string;
  children?: ReactNode;
  noBorderBottom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={StyleSheet.flatten([
        styles.accordionContainer,
        {
          borderBottomWidth: props.noBorderBottom ? 0 : 1,
        },
      ])}
    >
      <Pressable onPress={() => setOpen(!open)}>
        <View style={styles.accordionHeader}>
          <Typography medium color="#007079" size={18}>
            {props.title}
          </Typography>
          <MaterialCommunityIcons
            color="#007079"
            size={24}
            name={open ? "chevron-up" : "chevron-down"}
          />
        </View>
      </Pressable>
      {open && props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    marginHorizontal: 0,
    marginTop: 24,
    paddingHorizontal: 16,
    borderBottomColor: "#DCDCDC",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default Accordion;
