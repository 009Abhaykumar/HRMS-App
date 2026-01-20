import { SET_ASSETS, CLEAR_ASSETS } from "../types/assetTypes";

// For API integration later
export const setAssets = (assets) => ({
  type: SET_ASSETS,
  payload: assets,
});

export const clearAssets = () => ({
  type: CLEAR_ASSETS,
});
