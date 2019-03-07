import React, { Component } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, Toast } from "native-base";
import Button from "../../components/Button";

import StorageService from "../../util/asyncStorage";

class CreateCard extends Component {
  state = {
    title: "",
    isLoading: false
  };

  handleSubmit = () => {
    const { navigation } = this.props;
    const { title } = this.state;

    this.setState(
      {
        isLoading: true
      },
      () => {
        StorageService.saveDeckTitle(title)
          .then(() => this.setState({ isLoading: false, title: "" }))
          .then(() =>
            Toast.show({
              text: "Criado com sucesso!"
            })
          )
          .then(() => navigation.navigate("Home", { newData: true }));
      }
    );
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.wrapper}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 18
              }}
            >
              Qual o titulo do seu novo deck?
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              placeholder="Digite aqui..."
              value={title}
              onChangeText={text => this.setState({ title: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.container}>
            <Button
              color="#000"
              title="Enviar"
              onPress={() => this.handleSubmit()}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    height: "40%",
    padding: 15
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 20
  }
});

export default CreateCard;
