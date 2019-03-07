import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Card } from "native-base";

import Button from "../../components/Button";
import StorageService from "../../util/asyncStorage";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    isLoading: false
  };

  handleSubmit = () => {
    const { navigation } = this.props;

    this.setState(
      {
        isLoading: true
      },
      () => {
        StorageService.addCardToDeck();
      }
    );

    navigation.navigate("DeckDetail", { newData: true });
  };

  render() {
    const { question, answer, isLoading } = this.state;

    return (
      <View style={styles.wrapper}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 18
              }}
            >
              Qual a Pergunta?
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              placeholder="Digite aqui..."
              value={question}
              onChangeText={text => this.setState({ question: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 18
              }}
            >
              Qual a Resposta?
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              placeholder="Digite aqui..."
              value={answer}
              onChangeText={text => this.setState({ awser: text })}
              style={styles.input}
            />
          </View>
          <View style={styles.container}>
            <Button
              color="#000"
              title={isLoading ? "Carregando..." : "Enviar"}
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
    height: "70%",
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

export default AddCard;
