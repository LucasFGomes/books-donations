import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchMyDonations: null,
  fetchMyDonationsSuccess: ["donations"],
  fetchMyDonationsError: ["err"],
});

const INITIAL_STATE = {
  donations: {},
  loadingDonations: false,
  err: null,
};

const myDonations = (state) => ({
  ...state,
  loadingDonations: true,
});

const myDonationsSuccess = (state, { donations }) => ({
  ...state,
  donations,
  loadingDonations: false,
});

const myDonationsError = (state, { err }) => ({
  ...state,
  loadingDonations: false,
  err,
});

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_MY_DONATIONS]: myDonations,
  [Types.FETCH_MY_DONATIONS_SUCCESS]: myDonationsSuccess,
  [Types.FETCH_MY_DONATIONS_ERROR]: myDonationsError,
});
