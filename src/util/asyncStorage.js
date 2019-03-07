import { AsyncStorage } from "react-native";

export const STORAGE_TYPES = {
  DECKS: "DECKS"
};

const getDecks = async () => {
  const stringifiedArray = await AsyncStorage.getItem(STORAGE_TYPES.DECKS);
  const restoredArray = JSON.parse(stringifiedArray);

  return restoredArray;
};
const getDeck = async id => {
  const stringifiedArray = await AsyncStorage.getItem(STORAGE_TYPES.DECKS);
  const restoredArray = JSON.parse(stringifiedArray);

  const deck = restoredArray.filter(item => item.id === id);

  return deck[0];
};
const saveDeckTitle = async title => {
  const newCard = {
    id: Math.random() * (1000000, 100) + 100,
    title,
    cards: []
  };

  const stringDecks = await AsyncStorage.getItem(STORAGE_TYPES.DECKS);

  const decks = JSON.parse(stringDecks);

  if (decks) {
    decks.push(newCard);
    return AsyncStorage.setItem(STORAGE_TYPES.DECKS, JSON.stringify(decks));
  } else {
    const newDeck = [];

    newDeck.push(newCard);

    return AsyncStorage.setItem(STORAGE_TYPES.DECKS, JSON.stringify(newDeck));
  }
};
const addCardToDeck = async (title, card) => {
  const decks = await getDecks();

  const deckArray = decks.filter(item => item.title === title);

  const newDeck = {
    ...deckArray[0],
    cards: [...deckArray[0].cards, card]
  };

  const newDecksToSave = [
    ...decks.filter(item => item.title !== title),
    newDeck
  ];

  return AsyncStorage.setItem(STORAGE_TYPES.DECKS, newDecksToSave);
};

export default {
  getDeck,
  getDecks,
  saveDeckTitle,
  addCardToDeck
};
