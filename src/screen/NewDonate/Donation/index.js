import React, { useState, useRef } from "react";
import googleBook from "../../../services/google-book";
import Icon from "react-native-vector-icons/Entypo";
import { debounce } from "lodash";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Title,
  Title_text,
  ButtomTouchableOpacity,
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Input,
  ContainerBook,
  InputTextArea,
  ScrollViewBook,
  ContainerSearch,
  Search_text,
} from "./style";
import userAssets from "../../../../assets/user.png";

export default function Donate(props) {
  const [books, setBooks] = useState([]);

  const delaySeach = useRef(
    debounce((e) => {
      filterBook(e);
    }, 400)
  ).current;

  async function donate(item) {
    props.handleDonate(item);
  }

  async function filterBook(text) {
    try {
      const { data } = await googleBook.get(`?q=${text}`);

      setBooks(data.items);
    } catch (err) {
      console.log("ERROR [GOOGLE BOOKS]", err);
    }
  }

  function Item({ item }) {
    const date = new Date(item.publishedDate);
    return (
      <TouchableOpacity onPress={() => donate(item)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#bbb",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
            width: "90%",
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 15,
            flex: 1,
          }}
        >
          {item.imageLinks ? (
            <View style={{ marginLeft: 5 }}>
              <Image
                style={{ height: 100, width: 60, resizeMode: "contain" }}
                source={{ uri: item.imageLinks.thumbnail }}
              />
            </View>
          ) : (
            <View style={{ marginLeft: 5 }}>
              <Image
                style={{ height: 100, width: 60, resizeMode: "contain" }}
                source={userAssets}
              />
            </View>
          )}
          <View
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginLeft: 15,
              width: "88%",
            }}
          >
            <View style={{ width: "88%" }}>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "300" }}>
                {item.authors && item.authors.join(", ")}
              </Text>
            </View>
            <Text>{`${item.publisher} - ${date.getFullYear()}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ContainerKeyboard behavior="padding" enabled>
      <ContainerInsideKeyboard>
        <Title>Doação</Title>
        <ContainerBook>
          <ContainerSearch>
            <Icon name="magnifying-glass" size={24} color="#dcdcdc" />
            <Search_text
              placeholder="Livro que deseja doar..."
              onChangeText={(text) => delaySeach(text)}
            />
          </ContainerSearch>
          {/* <ButtomTouchableOpacity onPress={donate}>
                <Title_text>Finalizar</Title_text>
            </ButtomTouchableOpacity> */}
        </ContainerBook>

        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={books}
            style={{ marginBottom: 10 }}
            renderItem={({ item }) => <Item item={item.volumeInfo} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </ContainerInsideKeyboard>
    </ContainerKeyboard>
  );
}
