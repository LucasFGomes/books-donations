import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchDataUser: null,
  fetchDataUserSuccess: ["dataUser"],
  fetchDataUserError: ["err"],
});

const INITIAL_STATE = {
  dataUser: {},
  loading: false,
  err: null,
};

const dataUser = (state) => ({
  ...state,
  loading: true,
});

const dataUserSuccess = (state, { dataUser }) => ({
  ...state,
  dataUser,
  loading: false,
});

const dataUserError = (state, { err }) => ({
  ...state,
  loading: false,
  err,
});

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_DATA_USER]: dataUser,
  [Types.FETCH_DATA_USER_SUCCESS]: dataUserSuccess,
  [Types.FETCH_DATA_USER_ERROR]: dataUserError,
});