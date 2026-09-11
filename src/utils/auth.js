const USERS_KEY = 'clinic_users';
const CURRENT_USER_KEY = 'clinic_current_user';

const normalizeUsername = (value = '') => value.trim().toLowerCase();

export function getUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch (error) {
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
  } catch (error) {
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

export function getUserAppointments(username) {
  const safeUsers = getUsers();
  const normalizedUsername = normalizeUsername(username || '');

  const foundUser = safeUsers.find((user) => normalizeUsername(user.username || '') === normalizedUsername);
  return Array.isArray(foundUser?.appointments) ? foundUser.appointments : [];
}

export function saveUserAppointments(username, appointments) {
  const safeUsers = getUsers();
  const normalizedUsername = normalizeUsername(username || '');

  const updatedUsers = safeUsers.map((user) => {
    if (normalizeUsername(user.username || '') !== normalizedUsername) {
      return user;
    }

    return {
      ...user,
      appointments,
    };
  });

  saveUsers(updatedUsers);
}