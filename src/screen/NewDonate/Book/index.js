import React, { useState, useEffect, useRef } from "react";
import api from "../../../services/api";
import { View, Text, Image } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import userAssets from "../../../../assets/user.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Title,
  Title_text,
  ButtomTouchableOpacity,
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Input,
  ContainerBook,
  InputTextArea,
  ViewCamera,
  ViewCameraTextPosition,
  CameraInsideTextPosition,
  CameraText,
  CameraTouchableOpacity,
  ModalPicture,
  ViewPicture,
  ViewTouchableOpacity,
} from "./style";

export default function Book(props) {
  const [credit, setCredit] = useState("");
  const [resume, setResume] = useState("");

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text> Acesso negado! </Text>;
  }

  async function takePicture() {
    if (camRef) {
      // const { uri } = await camRef
      //   .takePictureAsync()
      //   .then(() => {
      //     Alert.alert("takePictureCreateAlbum: taking picture");
      //   })
      //   .catch((error) => {
      //     Alert.alert("takePictureCreateAlbum Error!");
      //   });
      setCapturedPhoto(null);
      setOpen(true);
    }
  }

  async function handleDonate() {
    const { item } = props;

    const year = new Date(item.publishedDate).getFullYear().toString();
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");

    const data = {
      title: item.title,
      author: item.authors && item.authors.join(", "),
      resume,
      year,
      credit,
      url: item && item.imageLinks.thumbnail ? [item.imageLinks.thumbnail] : [],
      user_id: userId,
    };

    try {
      if (!data.title || !data.author)
        throw new Error(
          "Livro sem título ou sem nome do autor. Tente outro livro"
        );
      if (!data.resume)
        throw new Error("Você precisa deixar uma observação sobre o livro.");

      await api.post(`/users/${userId}/books`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Livro registrado com sucesso!");

      setOpen(false);
      props.handleDonate(null);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  function backScreen() {
    props.handleDonate(null);
    setOpen(false);
  }

  return (
    <ViewCamera>
      {/* <Camera
        style={{
          flex: 1,
          height: 400,
          width: "96%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        type={type}
        ref={camRef}
      >
        <ViewCameraTextPosition>
          <CameraInsideTextPosition
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <CameraText>TROCAR</CameraText>
          </CameraInsideTextPosition>
        </ViewCameraTextPosition>
      </Camera>
      <CameraTouchableOpacity onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#fff" />
      </CameraTouchableOpacity>
      <ButtomTouchableOpacity
        style={{ display: "flex", alignSelf: "center" }}
        onPress={() => props.handleDonate(null)}
      >
        <Title_text>Voltar</Title_text>
      </ButtomTouchableOpacity> */}
      <ModalPicture animationType="slide" transparent={false} visible={open}>
        <ContainerKeyboard behavior="padding" enabled>
          <ContainerInsideKeyboard>
            <ViewPicture>
              <ViewTouchableOpacity onPress={backScreen}>
                <FontAwesome name="window-close" size={35} color="#ff0000" />
              </ViewTouchableOpacity>
              <Image
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignSelf: "center",
                  resizeMode: "stretch",
                }}
                source={{ uri: props.item && props.item.imageLinks.thumbnail }}
              />
            </ViewPicture>
            <View style={{ flex: 1, alignItems: "center" }}></View>
            <Title>Livro</Title>
            <ContainerBook>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                {props.item.title}
              </Text>
              <InputTextArea
                placeholder="observação"
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
                numberOfLines={4}
                value={resume}
                onChangeText={setResume}
              />
              <Input
                placeholder="valor"
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false}
                value={credit}
                onChangeText={setCredit}
              />
              <ButtomTouchableOpacity onPress={handleDonate}>
                <Title_text>Finalizar</Title_text>
              </ButtomTouchableOpacity>
            </ContainerBook>
          </ContainerInsideKeyboard>
        </ContainerKeyboard>
      </ModalPicture>
    </ViewCamera>
  );
}
