export const APPOINTMENT_SLOT_TAKEN_ERROR =
  "This appointment time is already booked. Please choose another time.";

function normalizeDate(date) {
  if (!date) return "";

  if (date instanceof Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  }

  return String(date).slice(0, 10);
}

function normalizeTime(time) {
  const match = String(time || "")
    .trim()
    .match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);

  if (!match) return "";

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();

  if (minutes > 59 || hours > (meridiem ? 12 : 23) || hours < 0) return "";
  if (meridiem && hours < 1) return "";

  if (meridiem) {
    hours = (hours % 12) + (meridiem === "PM" ? 12 : 0);
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getSlotKey(appointmentInfo) {
  const normalizedDate = normalizeDate(appointmentInfo?.date);
  const normalizedTime = normalizeTime(appointmentInfo?.time);
  return normalizedDate && normalizedTime
    ? `${normalizedDate}T${normalizedTime}`
    : "";
}

function getAppointmentSlotKey(appointment) {
  const appointmentInfo = appointment?.appointmentInfo || appointment;
  return getSlotKey(appointmentInfo);
}

export function isAppointmentSlotBooked(appointments, appointmentInfo) {
  const slotKey = getSlotKey(appointmentInfo);
  if (!slotKey || !Array.isArray(appointments)) return false;

  return appointments.some((appointment) => {
    const status = String(appointment?.status || "").toLowerCase();
    if (status === "cancelled" || status === "canceled") return false;

    return getAppointmentSlotKey(appointment) === slotKey;
  });
}
