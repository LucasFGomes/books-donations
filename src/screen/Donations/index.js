import React, { useEffect } from "react";
import api from "../../services/api";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as donationsDispatchers from "./redux/donations.dispatchers";
import * as profileDispatchers from '../Profile/redux/profile.dispatchers';

import _ from "lodash";
import moment from "moment";

import {
  View,
  Text,
  FlatList,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Rating, AirbnbRating } from 'react-native-ratings';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Title,
  Item,
  InfoView,
  ViewButtons,
  TouchableOpacityCompleted,
  TouchableOpacityCancel,
} from "./style";

const STATUS_TYPE = {
  processing: "Em Andamento",
  completed: "Concluída",
};

const DonationsMade = ({ donations, loading, refreshList, renderItem }) => {
  return donations && !_.isEmpty(donations.user_donations) ? (
    <FlatList
      data={donations.user_donations}
      onRefresh={refreshList}
      refreshing={loading}
      style={{ marginBottom: 2 }}
      renderItem={({ item }) => renderItem(item, true)}
      keyExtractor={(item) => item.donation_id.toString()}
    />
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Você ainda não possui doações</Text>
      <Text>Doe um livro!</Text>
    </View>
  );
};

const Receipts = ({ donations, loading, refreshList, renderItem }) => {
  return donations && !_.isEmpty(donations.user_receipts) ? (
    <FlatList
      data={donations.user_receipts}
      onRefresh={refreshList}
      refreshing={loading}
      style={{ marginBottom: 2 }}
      renderItem={({ item }) => renderItem(item, false)}
      keyExtractor={(item) => item.donation_id.toString()}
    />
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Você ainda não possui doações</Text>
      <Text>Doe um livro!</Text>
    </View>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

function Donations(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Doações" },
    { key: "second", title: "Recebimentos" },
  ]);

  useEffect(() => {
    const { actions } = props;
    actions.dispatchFetchDonations();
  }, []);

  const refreshList = async () => {
    const { actions } = props;
    actions.dispatchFetchDonations();
    actions.dispatchFetchDataUser();
  };

  const cancelDonation = async (donation) => {
    const token = await AsyncStorage.getItem("token");
    const { donation_id, book_id } = donation;
    const { actions } = props;

    try {
      const response = await Promise.all([
        api.delete(`/users/books/donations/${donation_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.put(`/users/books/${book_id}`),
      ]);

      if (response[0].status === 200) {
        Alert.alert(`${response[0].data.message}`, undefined);
        actions.dispatchFetchDonations();
        actions.dispatchFetchDataUser();
      } else {
        throw new Error("Erro ao buscar os dados.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completedDonation = async (donation) => {
    const token = await AsyncStorage.getItem("token");
    const { donor_id, receiver_id, donation_id, book_id, credit } = donation;
    const { actions } = props;

    const dataSend = {
      receiver_id,
      book_id,
      credit,
    };

    try {
      const response = await Promise.all([
        api.put(`/users/${donor_id}/books/donations/${donation_id}`, dataSend, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.put(`/users/books/${book_id}/donations`),
      ]);

      if (response[0].status === 200) {
        Alert.alert(`${response[0].data.message}`, undefined);
        actions.dispatchFetchDonations();
        actions.dispatchFetchDataUser();
      } else {
        throw new Error("Erro ao buscar os dados.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const giveNote = async (note, donationId, ratedUserId, donor) => {
    const token = await AsyncStorage.getItem("token");
    const data = { note, donationId, ratedUserId, donor };
    const { actions } = props;

    try {
      const response = await api.put('/users', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert(undefined, `${response.data.message}`);
        actions.dispatchFetchDonations();
      } else {
        throw new Error('Erro ao dar nota.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ratingsText = ['Avaliado', 'Avaliado', 'Avaliado', 'Avaliado', 'Avaliado'];

  const renderItem = (item, donation) => {
    return (
      <Item>
        <InfoView>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Livro: </Text>
            {item.book_title}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Status: </Text>
            {STATUS_TYPE[item.status]}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Crédito: </Text>
            {item.credit}
          </Text>
          {item.status == "completed" && (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Data da Confirmação: </Text>
              {moment(item.updated_at).format("DD/MM/YYYY")}
            </Text>
          )}
          {donation ? (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Recebedor(a): </Text>
              {item.name_receiver}
            </Text>
          ) : (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Doador(a): </Text>
              {item.name_donor}
            </Text>
          )}
        </InfoView>
        {item.status == "processing" && donation && (
          <ViewButtons>
            <TouchableOpacityCancel onPress={() => cancelDonation(item)}>
              <IconMaterialIcons
                name="cancel"
                size={25}
                color="#ffffff"
                style={{ padding: 2 }}
              />
            </TouchableOpacityCancel>
            <TouchableOpacityCompleted onPress={() => completedDonation(item)}>
              <Icon
                name="check-circle"
                size={25}
                color="#ffffff"
                style={{ padding: 2 }}
              />
            </TouchableOpacityCompleted>
          </ViewButtons>
        )}
        {item.status == 'completed' && (
          <View style={{ justifyContent: 'flex-end'}}>
            <AirbnbRating
              count={5}
              reviews={ratingsText.map(ratingText => (<Text style={{ fontSize: 18 }}>{ratingText}</Text>))}
              onFinishRating={(note) => giveNote(note, item.donation_id, (donation) ? item.receiver_id : item.donor_id, donation)}
              isDisabled={donation ? item.donor_evaluation : item.receiver_evaluation}
              defaultRating={!item.donor_note && !item.receiver_note ? 0 : donation ? item.donor_note : item.receiver_note}
              size={15}
            />
          </View>
        )}
      </Item>
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"#000"}
      inactiveColor={"#F6F8FA"}
      indicatorStyle={{ backgroundColor: "#000" }}
      style={{ backgroundColor: "#88b6a3" }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <DonationsMade
            donations={props.donations}
            loading={props.loadingDonations}
            refreshList={refreshList}
            renderItem={renderItem}
          />
        );
      case "second":
        return (
          <Receipts
            donations={props.donations}
            loading={props.loadingDonations}
            refreshList={refreshList}
            renderItem={renderItem}
          />
        );
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor="#88b6a3"/>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  donations: state.donationsReducer.donations,
  loadingDonations: state.donationsReducer.loadingDonations,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...donationsDispatchers, ...profileDispatchers }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Donations);
