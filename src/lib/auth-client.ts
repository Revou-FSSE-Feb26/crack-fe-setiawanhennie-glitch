const API_URL = 'http://localhost:3001/auth';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  school?: string;
  className?: string;
  role?: "STUDENT" | "TEACHER";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyData {
  email: string;
  otp: string;
}

export async function register(data: RegisterData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  return res.json();
}

export async function verifyEmail(data: VerifyData) {
  const res = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Verification failed');
  }
  
  return res.json();
}

export async function login(data: LoginData) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  
  const result = await res.json();
  
  // Store in localStorage (for client-side checks)
  if (result.access_token) {
    localStorage.setItem('token', result.access_token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    // ALSO set as HTTP-only cookie (for middleware/server checks)
    document.cookie = `token=${result.access_token}; path=/; max-age=604800; SameSite=Strict`;
  }
  
  return result;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  document.cookie = 'token=; path=/; max-age=0'; // Delete cookie
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Base URL for non-auth endpoints (users, etc.)
const API_URL_BASE = 'http://localhost:3001';

export async function fetchUsers() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat pengguna');
  return res.json();
}

export async function updateUserRole(userId: string, role: 'STUDENT' | 'TEACHER' | 'ADMIN') {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error('Gagal mengubah role');
  return res.json();
}

export async function toggleUserSuspend(userId: string, suspend: boolean) {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/users/${userId}/suspend`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ suspend }),
  });
  if (!res.ok) throw new Error('Gagal mengubah status');
  return res.json();
}

export async function fetchAdminStats() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/users/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat statistik');
  return res.json();
}

export async function fetchModerationStats() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/moderation/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat statistik moderasi');
  return res.json();
}

export async function fetchOpenReports() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/moderation/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat laporan');
  return res.json();
}

export async function fetchModerationHistory() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/moderation/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat riwayat');
  return res.json();
}

export async function resolveReport(
  reportId: string,
  action: 'IGNORED' | 'CONTENT_HIDDEN' | 'USER_SUSPENDED'
) {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/moderation/reports/${reportId}/resolve`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error('Gagal menyelesaikan laporan');
  return res.json();
}

export async function fetchTeacherStats() {
  const token = getToken();
  const res = await fetch(`${API_URL_BASE}/teacher/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal memuat statistik guru');
  return res.json();
}