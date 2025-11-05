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
