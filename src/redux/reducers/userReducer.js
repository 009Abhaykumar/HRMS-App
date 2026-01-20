import {
  UPDATE_USER,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  UPDATE_BANK_DETAILS,
} from "../types/userTypes";

const initialState = {
  // ----------------- MAIN DETAILS -----------------
  email: "abhayanju58@gmail.com",
  alternateEmail: "",
  phone: "7018733095",
  alternatePhone: "",
  department: "Information Technology",
  reportingPerson: "Vinay Sharma",
  employeeId: "CIPL10043",

  // ----------------- PERSONAL DETAILS -----------------
  name: "Abhay Kumar",
  fatherName: "",
  motherName: "",
  gender: "",
  dob: "August 30, 2002",
  bloodGroup: "O+",
  birthMark: "Black mole on left cheek",
  birthPlace: "",
  maritalStatus: "Single",
  marriageDate: "",
  aadhaar: "",
  pan: "",
  uan: "",
  esi: "",

  // ----------------- ADDRESS DETAILS -----------------
  address: "Signature Proxima",
  permanentAddress:
    "Vill. Kalwal PO. Loharli Tell. Dhatwaal Ditt. Hamirpur",

  // ----------------- EDUCATION -----------------
  education: [
    {
      id: 1,
      college: "Chitkara University",
      course: "B.E. (Bachelor of Engineering)",
      grade: "A",
      fromYear: "August 3, 2021",
      endYear: "July 3, 2025",
    },
  ],

  // ----------------- EXPERIENCE -----------------
  experience: [
    {
      id: 1,
      companyName: "NA",
      designation: "NA",
      position: "NA",
      duration: "NA",
      ctc: "NA",
      inHand: "NA",
    },
  ],

  // ----------------- EMERGENCY CONTACTS -----------------
  emergencyContacts: [],

  // ----------------- DOCUMENTS -----------------
  documents: [],

  // ----------------- BANK DETAILS (NEW) -----------------
  bankDetails: {
    accountNo: "50100451025902",
    ifsc: "HDFC0001556",
    bankName: "HDFC BANK",
    branch:
      "SCO-3II, Sec 40 D, Main Branch Sec 9, Chandigarh",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };

    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };

    case UPDATE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };

    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(
          (doc) => doc.id !== action.payload
        ),
      };

    /* -------- BANK DETAILS -------- */
    case UPDATE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload,
      };

    default:
      return state;
  }
}
