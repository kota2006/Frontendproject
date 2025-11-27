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

export default { authHeaders, getJson, postJson, putJson, deleteJson };
export function authHeaders(){
  const token = localStorage.getItem('sw_token');
  return token ? { Authorization: 'Bearer '+token } : {};
}

export async function getJson(url, opts={}){
  const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + url, { headers: { 'Content-Type':'application/json', ...opts.headers } });
  return res.json();
}

export async function postJson(url, body, opts={}){
  const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function putJson(url, body, opts={}){
  const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function deleteJson(url, opts={}){
  const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...opts.headers }
  });
  return res.json();
}
