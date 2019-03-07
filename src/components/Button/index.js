import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = props => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={[
      styles.button,
      props.color === "white"
        ? { backgroundColor: props.color, borderWidth: 1, borderColor: "#000" }
        : { backgroundColor: props.color }
    ]}
  >
    <Text
      style={[
        styles.buttonLabel,
        props.color === "white" ? { color: "#000" } : {}
      ]}
    >
      {props.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "40%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Button;
