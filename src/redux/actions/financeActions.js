import {
  SET_MONTH_DATA,
  SET_SALARY_SLIPS,
  SET_ADVANCE_SLIPS,
} from "../types/financeTypes";

// Set data for a specific month
export const setMonthData = (monthKey, data) => ({
  type: SET_MONTH_DATA,
  payload: { monthKey, data },
});

// Set salary slips list
export const setSalarySlips = (slips) => ({
  type: SET_SALARY_SLIPS,
  payload: slips,
});

// Set advance slips list
export const setAdvanceSlips = (slips) => ({
  type: SET_ADVANCE_SLIPS,
  payload: slips,
});
