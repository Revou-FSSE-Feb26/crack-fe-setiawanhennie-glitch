// src/lib/auth-client.ts

const API_URL = 'http://localhost:3001/auth';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  school?: string;
  className?: string;
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