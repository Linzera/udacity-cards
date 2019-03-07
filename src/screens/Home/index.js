import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import {
  ListItem,
  Container,
  Content,
  Right,
  Icon,
  Left,
  Separator,
  Spinner
} from "native-base";

import StorageService from "../../util/asyncStorage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      deck: []
    };
  }

  componentDidMount() {
    StorageService.getDecks().then(item =>
      item
        ? this.setState({
            isLoading: false,
            deck: item
          })
        : this.setState({
            isLoading: false
          })
    );
  }

  componentWillReceiveProps() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        StorageService.getDecks().then(item =>
          item
            ? this.setState({
                isLoading: false,
                deck: item
              })
            : this.setState({
                isLoading: false
              })
        );
      }
    );
  }

  render() {
    const { navigation } = this.props;
    const { isLoading, deck } = this.state;

    return (
      <Container>
        <Content>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Spinner />
            </View>
          ) : (
            <FlatList
              data={deck}
              ListEmptyComponent={() => (
                <Separator style={{ height: 60 }} bordered>
                  <Text style={{ alignSelf: "center" }}>Sem cards!</Text>
                </Separator>
              )}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() =>
                    navigation.navigate("DeckDetail", { data: item })
                  }
                >
                  <Left>
                    <Text>{item.title}</Text>
                    <Text style={{ marginLeft: 10, color: "gray" }}>
                      Cards: {item.cards.length}
                    </Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default Home;
