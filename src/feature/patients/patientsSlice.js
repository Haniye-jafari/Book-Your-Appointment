import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAppointment, getAllAppointments } from "../../utils/auth";
import {
  APPOINTMENT_SLOT_TAKEN_ERROR,
  isAppointmentSlotBooked,
} from "../../utils/appointmentSlots";

export const fetchAppointments = createAsyncThunk(
  "patients/fetchAppointments",
  async () => getAllAppointments(),
  {
    condition: (_, { getState }) => getState().patients.status !== "loading",
  }
);

export const addAppointment = createAsyncThunk(
  "patients/addAppointment",
  async (appointment) => {
    const username = appointment.patientUsername;
    if (!username) {
      throw new Error("Please sign in before booking an appointment.");
    }

    const existingAppointments = await getAllAppointments();
    if (isAppointmentSlotBooked(existingAppointments, appointment.appointmentInfo)) {
      throw new Error(APPOINTMENT_SLOT_TAKEN_ERROR);
    }

    const appointmentToSave = {
      ...appointment,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    return createAppointment(appointmentToSave);
  }
);

const initialState = {
  appointments: [],
  status: "idle",
  saveStatus: "idle",
  error: null,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    
    clearAppointments(state) {
      state.appointments = [];
    },
    addPatient: (state, action) => {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAppointment.pending, (state) => {
        state.saveStatus = "loading";
        state.error = null;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.saveStatus = "succeeded";
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.error = action.error.message;
      });
  },
});
export const {addPatient} = patientsSlice.actions;
export const { clearAppointments } = patientsSlice.actions;
export default patientsSlice.reducer;
