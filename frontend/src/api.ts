const BASE = '/api';
const CURRENT_USER_ID = 1; // demo user seeded in backend


function headers() {
    return { 'Content-Type': 'application/json', 'X-User-Id': String(CURRENT_USER_ID) };
}


export async function getTimeline(page = 1) {
    const res = await fetch(`${BASE}/timeline?page=${page}`, { headers: headers() });
    return res.json();
}
export async function getExplore(page = 1) {
    const res = await fetch(`${BASE}/murmurs?page=${page}`, { headers: headers() });
    return res.json();
}
export async function getMurmur(id: number) {
    const res = await fetch(`${BASE}/murmurs/${id}`, { headers: headers() });
    return res.json();
}
export async function createMurmur(content: string) {
    const res = await fetch(`${BASE}/me/murmurs`, { method: 'POST', headers: headers(), body: JSON.stringify({ content }) });
    return res.json();
}
export async function deleteMurmur(id: number) {
    await fetch(`${BASE}/me/murmurs/${id}`, { method: 'DELETE', headers: headers() });
}
export async function likeMurmur(id: number) {
    const res = await fetch(`${BASE}/murmurs/${id}/like`, { method: 'POST', headers: headers() });
    return res.json();
}
export async function unlikeMurmur(id: number) {
    const res = await fetch(`${BASE}/murmurs/${id}/like`, { method: 'DELETE', headers: headers() });
    return res.json();
}
export async function getMe() {
    const res = await fetch(`${BASE}/me`, { headers: headers() });
    return res.json();
}
export async function getUser(id: number) {
    const res = await fetch(`${BASE}/users/${id}`, { headers: headers() });
    return res.json();
}
export async function getUserMurmurs(id: number, page = 1) {
    const res = await fetch(`${BASE}/users/${id}/murmurs?page=${page}`, { headers: headers() });
    return res.json();
}
export async function follow(id: number) {
    await fetch(`${BASE}/users/${id}/follow`, { method: 'POST', headers: headers() });
}
export async function unfollow(id: number) {
    await fetch(`${BASE}/users/${id}/follow`, { method: 'DELETE', headers: headers() });
}