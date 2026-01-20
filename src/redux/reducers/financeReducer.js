import {
  SET_MONTH_DATA,
  SET_SALARY_SLIPS,
  SET_ADVANCE_SLIPS,
} from "../types/financeTypes";

const initialState = {
  monthsData: {
    "2025-01": {
      standardSalary: 8000,
      totalDays: 31,
      payDays: 12,
      upcomingSalary: 3096.77,
    },
    "2025-02": {
      standardSalary: 8000,
      totalDays: 28,
      payDays: 25,
      upcomingSalary: 6800,
    },
    "2025-03": {
      standardSalary: 8000,
      totalDays: 30,
      payDays: 22,
      upcomingSalary: 6000,
    },
  },

  salarySlips: [
    { id: 1, month: "January", year: 2025, payDays: 12, netPay: 3096.77 },
    { id: 2, month: "February", year: 2025, payDays: 25, netPay: 6800 },
    { id: 3, month: "March", year: 2025, payDays: 22, netPay: 6000 },
  ],

  advanceSlips: [
    {
      id: 1,
      requestDate: "03 Feb 2025",
      amount: 2000,
      reason: "Medical",
      approved: "Approved",
      status: "Paid",
    },
  ],
};

export default function financeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH_DATA:
      return {
        ...state,
        monthsData: {
          ...state.monthsData,
          [action.payload.monthKey]: action.payload.data,
        },
      };

    case SET_SALARY_SLIPS:
      return { ...state, salarySlips: action.payload };

    case SET_ADVANCE_SLIPS:
      return { ...state, advanceSlips: action.payload };

    default:
      return state;
  }
}
