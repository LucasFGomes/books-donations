import { combineReducers } from "redux";

import donationsReducer from "../screen/Donations/redux/donations.reducer";
import profileReducer from '../screen/Profile/redux/profile.reducer';

export default combineReducers({
  donationsReducer,
  profileReducer
});
