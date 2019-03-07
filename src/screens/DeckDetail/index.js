import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Button from "../../components/Button";

import StorageService from "../../util/asyncStorage";

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.data.title
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      id: props.navigation.state.params.data.id,
      title: "",
      isLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.state;

    StorageService.getDeck(id).then(data =>
      this.setState({
        isLoading: false,
        cards: data.cards,
        title: data.title
      })
    );
  }

  componentWillReceiveProps() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        const { id } = this.state;

        StorageService.getDeck(id).then(data =>
          this.setState({
            isLoading: false,
            cards: data.cards,
            title: data.title
          })
        );
      }
    );
  }

  render() {
    const { navigation } = this.props;
    const { isLoading } = this.state;

    return isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {this.state.title}
          </Text>
          <Text style={{ fontSize: 18, color: "gray" }}>
            {this.state.cards.length} cards
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Button
            title="Add card"
            color="white"
            onPress={() => navigation.navigate("AddCard")}
          />
          <Button
            title="Start Quiz"
            color="#000"
            onPress={() => console.log("teste")}
          />
        </View>
      </View>
    );
  }
}

export default DeckDetail;
