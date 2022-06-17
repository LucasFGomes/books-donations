import { Creators as actionsUser } from "./profile.reducer";
import api from "../../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

export function dispatchFetchDataUser() {
  return async function (dispatch, getState) {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      dispatch(actionsUser.fetchDataUser());

      const { status, data } = await api.get(
        `/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('dataUser', data)

      if (status === 200) {
        dispatch(actionsUser.fetchDataUserSuccess(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log("ERROR", err);
      dispatch(actionsUser.fetchDataUserError(err));
    }
  };
}