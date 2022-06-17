import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Octicons, FontAwesome5 } from '@expo/vector-icons';
import api from "../../services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as donationsDispatchers from "./redux/profile.dispatchers";
import * as profileDispatchers from '../Donations/redux/donations.dispatchers';

import _ from 'lodash';

import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from "./style";

function Profile(props) {
  const [nameUser, setNameUser] = useState("");
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    // fetchCredits();
    fetchData();
  }, []);

  const fetchData = async () => {
    const { actions } = props;

    actions.dispatchFetchDonations();
    actions.dispatchFetchDataUser();
  };

  const fetchCredits = async () => {
    const nameUser = await AsyncStorage.getItem("nameUser");
    const creditsUser = await AsyncStorage.getItem("credits");
    setNameUser(nameUser);
    setCredits(creditsUser);
  };

  async function handleLogout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");

    props.navigation.navigate("Login");
  }

  const { loading, loadingDonations, donations, dataUser } = props;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"} enabled>
      <StatusBar />
      <View style={styles.iconUser}>
        <FontAwesome5 name="user-circle" size={60} color="black" style={{ marginTop: 7}}/>
      </View>
      <View>
        <Text style={{ fontSize: 22 }}>{dataUser && dataUser.name}</Text>
        <Text style={{ paddingBottom: 30, fontSize: 12, textAlign: 'center' }}>
          <Octicons name="star" size={12} color="#F1C40E" /> 
          {' '}{!_.isEmpty(dataUser) && parseFloat(dataUser.points).toFixed(2)}
        </Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <View
          style={styles.boxInfo}
        >
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Icon
              name="loyalty"
              size={18}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textProfile}>
              Créditos disponíveis: {dataUser && dataUser.credits}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Icon
              name="favorite"
              size={18}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textProfile}>
              Doações concluídas: {donations && donations.total_completed}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Icon
              name="cached"
              size={16}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textProfile}>
              Doações pendentes: {donations && donations.total_pending}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Icon
              name="check"
              size={16}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textProfile}>
              Recebimentos concluídos: {donations && donations.total_received_completed}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Icon
              name="restore"
              size={16}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textProfile}>
              Recebimentos pendentes: {donations && donations.total_received_pending}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
          <Text style={styles.textButton}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state) => ({
  donations: state.donationsReducer.donations,
  dataUser: state.profileReducer.dataUser 
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...donationsDispatchers, ...profileDispatchers }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
