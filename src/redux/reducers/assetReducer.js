import { SET_ASSETS, CLEAR_ASSETS } from "../types/assetTypes";

const initialState = {
  assets: [],  // Default empty — "No System Allotted"
};

export default function assetReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSETS:
      return { ...state, assets: action.payload };

    case CLEAR_ASSETS:
      return { ...state, assets: [] };

    default:
      return state;
  }
}
