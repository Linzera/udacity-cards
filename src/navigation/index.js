import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";

import Home from "../screens/Home";
import CreateCard from "../screens/CreateCard";
import DeckDetail from "../screens/DeckDetail";
import AddCard from "../screens/AddCard";
import Quiz from "../screens/Quiz";

import { StatusBar } from "react-native";

const DeckFlow = createMaterialTopTabNavigator(
  {
    Decks: Home,
    CreateCard: CreateCard
  },
  {
    initialRouteName: "Decks",
    tabBarOptions: {
      style: {
        backgroundColor: "black",
        marginTop: StatusBar.currentHeight
      },
      indicatorStyle: {
        backgroundColor: "white"
      }
    }
  }
);

const AppFlow = createStackNavigator(
  {
    Home: {
      screen: DeckFlow,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    DeckDetail: {
      screen: DeckDetail
    },
    AddCard: AddCard,
    Quiz: Quiz
  },
  {
    initialRouteName: "Home"
  }
);

const AppContaienr = createAppContainer(AppFlow);

export default AppContaienr;
