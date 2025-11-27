import mock from './mockApi';

export const authHeaders = () => { const u = mock.currentUser(); return u ? { Authorization: 'Bearer ' + u.id } : {}; };

export const getJson = async (url, opts = {}) => {
  // map url paths to mock functions
  if (url.startsWith('/api/resources')) return mock.listResources();
  if (url.startsWith('/api/programs')) return mock.listPrograms();
  if (url === '/api/metrics') return { users: 2, resources: mock.listResources().length, programs: mock.listPrograms().length };
  return {};
};

export const postJson = async (url, body, opts = {}) => {
  if (url === '/api/auth/login') return mock.login(body.email, body.password);
  if (url === '/api/resources') return mock.createResource(body);
  if (url === '/api/programs') return mock.createProgram(body);
  if (url.endsWith('/join')) {
    const pid = url.split('/')[3];
    const user = mock.currentUser();
    return mock.joinProgram(pid, user.id);
  }
  return {};
};

export const putJson = async (url, body, opts = {}) => {
  if (url.startsWith('/api/resources/')) {
    const id = url.split('/').pop();
    return mock.updateResource(id, body);
  }
  return {};
};

export const deleteJson = async (url, opts = {}) => {
  if (url.startsWith('/api/resources/')) {
    const id = url.split('/').pop();
    return mock.deleteResource(id);
  }
  return {};
};

// Exports are named only to avoid duplicate-export issues during build.
// Consumers import { getJson, postJson, ... } from '../services/api'
