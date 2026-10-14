import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {},
  appointmentInfo: {},
  documents: [],
};

const patientFormSlice = createSlice({
  name: "patientForm",
  initialState,
  reducers: {
    setPersonalInfo(state, action) {
      state.personalInfo = action.payload;
    },
    setAppointmentInfo(state, action) {
      state.appointmentInfo = action.payload;
    },
    setDocuments(state, action) {
      state.documents = action.payload;
    },
    resetPatientForm() {
      return initialState;
    },
  },
});

export const { setPersonalInfo, setAppointmentInfo, setDocuments, resetPatientForm } = patientFormSlice.actions;
export default patientFormSlice.reducer;
