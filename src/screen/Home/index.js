import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Text, Alert } from "react-native";
import moment from "moment";
import MockData from "./Card/mock_data.js";
import api from "../../services/api";
import { View, RefreshControl, StatusBar } from "react-native";
import user from "../../../assets/user.png";
import firebase from "../../../firebase";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  ContainerSearch,
  Search_text,
  ContainerBody,
  ContainerList,
} from "./style";

import Card from "./Card";

moment.locale("pt-BR");
export default function Login({ navigation }) {
  const [books, setBooks] = useState([]);
  const [booksFilter, setBooksFilter] = useState([]);
  const [credits, setCredits] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  async function mount() {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    const creditsUser = await AsyncStorage.getItem("credits");

    const response = await api.get(`/users/${userId}/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBooks(response.data);
    setBooksFilter(response.data);
    setCredits(creditsUser);
  }

  useEffect(() => {
    mount();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);

    await mount();

    setRefreshing(false);
  };

  function handleClickCard(id, nameDonor, donorId, points) {
    Alert.alert("Tem certeza que deseja esse livro?", undefined, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => donateBook(id, nameDonor, donorId, points) },
    ]);
  }

  async function donateBook(id, nameDonor, donorId, points) {
    const userId = await AsyncStorage.getItem("userId");
    const nameUser = await AsyncStorage.getItem("nameUser");
    const token = await AsyncStorage.getItem("token");

    AsyncStorage.setItem("nameDonor", nameDonor);
    AsyncStorage.setItem("donorId", String(donorId));

    const data = {
      address: "recife",
      date_delivery: moment().format("YYYY-MM-DD"),
      book_id: id,
      receiver_id: userId,
    };

    if (parseInt(points) > parseInt(credits)) {
      Alert.alert("Ops, você não tem crédito suficiente.", undefined);
    } else {
      try {
        const response = await Promise.all([
          api.post(`/users/${donorId}/donations`, data, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.put(`/users/${donorId}/books/register_interest`, { book_id: id }, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        Alert.alert("ATENÇÃO!", "O livro é quase seu, entre em contato com o doador");

        mount();

        navigation.navigate("Donations");
      } catch (e) {
        console.log(e);
        Alert.alert("Erro", "No momento o livro não pode ser doado, tente novamente");
      }
    }
  }

  function filterBook(text) {
    if (text.length === 0) {
      setBooksFilter(books);
    } else if (text.length % 2 === 0) {
      setBooksFilter(
        books.filter((book) =>
          book.title.toUpperCase().includes(text.toUpperCase())
        )
      );
    }
  }

  return (
    <Container>
      <StatusBar/>
      <ContainerSearch>
        <Icon name="magnifying-glass" size={24} color="#dcdcdc" />
        <Search_text
          placeholder="Pesquisar..."
          onChangeText={(text) => filterBook(text)}
        />
      </ContainerSearch>

      {booksFilter.length > 0 ? (
        <ContainerList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
          }
        >
          {booksFilter.map((book, index) => {
            return (
              <Card
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                nameDonor={book.user_name}
                donorId={book.user_id}
                points={book.credit}
                description={book.resume}
                rate={4.7}
                profilePicture={book.picture_book}
                handleClickCard={handleClickCard}
              />
            );
          })}
        </ContainerList>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Nenhum livro encontrado</Text>
          <Text>Mude essa situação. Doe um livro!</Text>
        </View>
      )}
    </Container>
  );
}
