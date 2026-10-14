const STORAGE_KEY = 'appointments_v1';

function _load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load appointments', e);
    return [];
  }
}

function _save(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error('Failed to save appointments', e);
  }
}

// appointment: { name, info, date } - date can be Date or ISO string
export function addAppointment({ name, info, date }) {
  const arr = _load();
  const iso = new Date(date).toISOString();
  const monthKey = iso.slice(0, 7); // YYYY-MM
  const ap = {
    id: Date.now().toString(),
    name: name || 'Unknown',
    info: info || '',
    date: iso,
    monthKey,
  };
  arr.push(ap);
  _save(arr);
  return ap;
}

export function getAppointmentsForDate(date) {
  const arr = _load();
  const day = new Date(date).toISOString().slice(0, 10); // YYYY-MM-DD
  return arr.filter((a) => a.date.slice(0, 10) === day);
}

export function getArchivesForYear(year) {
  const arr = _load();
  const result = {};
  const y = String(year);
  arr.forEach((a) => {
    if (a.date.slice(0, 4) === y) {
      result[a.monthKey] = result[a.monthKey] || [];
      result[a.monthKey].push(a);
    }
  });
  return result; // { '2026-01': [..], '2026-02': [..] }
}

export function getAllAppointments() {
  return _load();
}
