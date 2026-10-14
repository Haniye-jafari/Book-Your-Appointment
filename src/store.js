import {configureStore} from "@reduxjs/toolkit";
import patientsReducer from "./feature/patients/patientsSlice";
import patientFormReducer from "./feature/patients/patientFormSlice"
export const store = configureStore({
    reducer: {
        patientForm: patientFormReducer,
        patients: patientsReducer,

    },
});