import {
  UPDATE_USER,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  UPDATE_BANK_DETAILS,
} from "../types/userTypes";

/* -------- USER -------- */
export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

/* -------- DOCUMENTS -------- */
export const addDocument = (document) => ({
  type: ADD_DOCUMENT,
  payload: {
    ...document,
    id: Date.now(),
  },
});

export const updateDocument = (updatedDocument) => ({
  type: UPDATE_DOCUMENT,
  payload: updatedDocument,
});

export const deleteDocument = (id) => ({
  type: DELETE_DOCUMENT,
  payload: id,
});

/* -------- BANK DETAILS -------- */
export const updateBankDetails = (bankDetails) => ({
  type: UPDATE_BANK_DETAILS,
  payload: bankDetails,
});
