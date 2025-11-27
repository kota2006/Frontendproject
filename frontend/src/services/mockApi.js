// Frontend-only mock API using localStorage. Replaces backend calls for single-user/demo mode.
const STORAGE_KEYS = {
  USERS: 'sw_users_v1',
  RESOURCES: 'sw_resources_v1',
  PROGRAMS: 'sw_programs_v1',
  TOKEN: 'sw_token',
};

function load(key, defaultValue) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : defaultValue;
  } catch (e) { return defaultValue; }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize sample data if missing
function ensureSeed() {
  if (!load(STORAGE_KEYS.USERS)) {
    const users = [
      { id: 'u-admin', name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'adminpass', joinedPrograms: [] },
      { id: 'u-stu1', name: 'Student One', email: 'student@example.com', role: 'student', password: 'studentpass', joinedPrograms: [] }
    ];
    save(STORAGE_KEYS.USERS, users);
  }
  if (!load(STORAGE_KEYS.RESOURCES)) {
    const resources = [
      { id: 'r-1', title: 'Campus Counseling Services', description: 'Free confidential counseling.', category: 'Mental Health', link: '' , createdBy: 'u-admin' },
      { id: 'r-2', title: 'Healthy Eating on a Budget', description: 'Tips and recipes.', category: 'Nutrition', link: '' , createdBy: 'u-admin' }
    ];
    save(STORAGE_KEYS.RESOURCES, resources);
  }
  if (!load(STORAGE_KEYS.PROGRAMS)) {
    const programs = [
      { id: 'p-1', title: 'Mindful Mornings', description: '6-week mindfulness', category: 'Mental Health', sessions: [{date: Date.now(), topic: 'Intro'}], members: ['u-stu1'] }
    ];
    save(STORAGE_KEYS.PROGRAMS, programs);
  }
}

ensureSeed();

// Simple token format: userId
export function login(email, password) {
  const users = load(STORAGE_KEYS.USERS, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  const token = user.id;
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export function logout() { localStorage.removeItem(STORAGE_KEYS.TOKEN); }

export function currentUser() {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (!token) return null;
  const users = load(STORAGE_KEYS.USERS, []);
  const u = users.find(x => x.id === token);
  if (!u) return null;
  return { id: u.id, name: u.name, email: u.email, role: u.role };
}

// Resources
export function listResources() { return load(STORAGE_KEYS.RESOURCES, []); }
export function createResource(resource) {
  const resources = load(STORAGE_KEYS.RESOURCES, []);
  const id = 'r-' + Date.now();
  const item = { id, ...resource };
  resources.unshift(item);
  save(STORAGE_KEYS.RESOURCES, resources);
  return item;
}
export function updateResource(id, patch) {
  const resources = load(STORAGE_KEYS.RESOURCES, []);
  const idx = resources.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Not found');
  resources[idx] = { ...resources[idx], ...patch };
  save(STORAGE_KEYS.RESOURCES, resources);
  return resources[idx];
}
export function deleteResource(id) {
  let resources = load(STORAGE_KEYS.RESOURCES, []);
  resources = resources.filter(r => r.id !== id);
  save(STORAGE_KEYS.RESOURCES, resources);
  return { ok: true };
}

// Programs
export function listPrograms() { return load(STORAGE_KEYS.PROGRAMS, []); }
export function createProgram(body) {
  const programs = load(STORAGE_KEYS.PROGRAMS, []);
  const id = 'p-' + Date.now();
  const item = { id, ...body, members: body.members || [] };
  programs.unshift(item);
  save(STORAGE_KEYS.PROGRAMS, programs);
  return item;
}
export function joinProgram(programId, userId) {
  const programs = load(STORAGE_KEYS.PROGRAMS, []);
  const users = load(STORAGE_KEYS.USERS, []);
  const p = programs.find(x => x.id === programId);
  if (!p) throw new Error('Program not found');
  if (!p.members.includes(userId)) p.members.push(userId);
  save(STORAGE_KEYS.PROGRAMS, programs);
  const u = users.find(x => x.id === userId);
  if (u && !u.joinedPrograms) u.joinedPrograms = [];
  if (u && !u.joinedPrograms.includes(programId)) u.joinedPrograms.push(programId);
  save(STORAGE_KEYS.USERS, users);
  return p;
}

export default {
  login, logout, currentUser,
  listResources, createResource, updateResource, deleteResource,
  listPrograms, createProgram, joinProgram
};
