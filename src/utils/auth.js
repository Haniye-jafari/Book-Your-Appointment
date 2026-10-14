const USERS_KEY = 'clinic_users';
const CURRENT_USER_KEY = 'clinic_current_user';
const APPOINTMENTS_STORAGE_KEY = 'clinic_appointments_fallback';

const normalizeUsername = (value = '') => value.trim().toLowerCase();

function readStoredJson(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors so booking does not fail in restricted browsers.
  }
}

function loadFallbackAppointments() {
  return readStoredJson(APPOINTMENTS_STORAGE_KEY, []);
}

function saveFallbackAppointments(appointments) {
  writeStoredJson(APPOINTMENTS_STORAGE_KEY, appointments);
  return appointments;
}

function addFallbackAppointment(appointment) {
  const normalizedAppointment = {
    ...appointment,
    id: appointment.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    status: appointment.status || 'Confirmed',
    confirmedAt: appointment.confirmedAt || new Date().toISOString(),
  };

  const appointments = loadFallbackAppointments();
  const updatedAppointments = [...appointments, normalizedAppointment];
  saveFallbackAppointments(updatedAppointments);
  return normalizedAppointment;
}

export function getUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
    return;
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getUserDocuments(username) {
  const safeUsers = getUsers();
  const normalizedUsername = normalizeUsername(username || '');

  const foundUser = safeUsers.find((user) => normalizeUsername(user.username || '') === normalizedUsername);
  return Array.isArray(foundUser?.uploadedDocuments) ? foundUser.uploadedDocuments : [];
}

export function saveUserDocuments(username, documents) {
  const safeUsers = getUsers();
  const normalizedUsername = normalizeUsername(username || '');

  const updatedUsers = safeUsers.map((user) => {
    if (normalizeUsername(user.username || '') !== normalizedUsername) {
      return user;
    }

    return {
      ...user,
      uploadedDocuments: Array.isArray(documents) ? documents : [],
    };
  });

  saveUsers(updatedUsers);
}

async function requestAppointments(path, options = {}) {
  const isReadRequest = !options.method || options.method === 'GET';

  try {
    const response = await fetch(`/api/appointments${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    }

    if ([502, 503, 504].includes(response.status)) {
      if (isReadRequest) {
        return loadFallbackAppointments();
      }

      const requestBody = options.body ? JSON.parse(options.body) : {};
      return addFallbackAppointment(requestBody);
    }

    throw new Error(`Appointments request failed (${response.status}).`);
  } catch {
    if (isReadRequest) {
      return loadFallbackAppointments();
    }

    const requestBody = options.body ? JSON.parse(options.body) : {};
    return addFallbackAppointment(requestBody);
  }
}

export function getAllAppointments() {
  return requestAppointments('');
}

export function createAppointment(appointment) {
  return requestAppointments('', {
    method: 'POST',
    body: JSON.stringify(appointment),
  });
}

export function getAllDocuments() {
  const safeUsers = getUsers();

  return safeUsers.flatMap((user) => {
    const documents = Array.isArray(user?.uploadedDocuments) ? user.uploadedDocuments : [];
    return documents.map((document) => ({
      ...document,
      patientUsername: user.username,
    }));
  });
}