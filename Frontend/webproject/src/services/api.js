import axios from 'axios';

const AUTH_TOKEN_KEY = 'authToken';

function getApiBaseUrl() {
  const fromEnv = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  // Dev: CRA proxy forwards /api → http://localhost:5063 (avoids browser CORS).
  if (process.env.NODE_ENV === 'development') {
    return '/api';
  }

  return 'http://localhost:5063/api';
}

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.title) {
    return error.response.data.title;
  }

  if (error.response?.status === 401) {
    return 'Unauthorized. Your backend requires a JWT — log in (see authAPI.login) or use an Admin/Instructor account for write operations.';
  }

  if (error.response) {
    return `HTTP ${error.response.status}`;
  }

  if (error.request) {
    return 'Unable to reach backend API (no response). Is it running at the correct URL/port? For dev, ensure npm start proxy matches your backend.';
  }

  return error.message || 'Unexpected API error';
};

const apiCall = async (request) => {
  try {
    const response = await request();
    return response?.data ?? null;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('API Error:', message);
    throw new Error(message);
  }
};

// ASP.NET: [Route("api/[controller]")] → StudentController → /api/Student (not /students)
export const authAPI = {
  login: async ({ username, password }) => {
    const data = await apiCall(() =>
      apiClient.post('/Auth/login', { username, password })
    );
    if (data?.token) setAuthToken(data.token);
    return data;
  },
  register: (payload) =>
    apiCall(() => apiClient.post('/Auth/register', payload)),
  logout: () => clearAuthToken(),
};

// ========== STUDENT ENDPOINTS ==========
export const studentAPI = {
  getAll: () => apiCall(() => apiClient.get('/Student')),
  getById: (id) => apiCall(() => apiClient.get(`/Student/${id}`)),
  create: (data) => apiCall(() => apiClient.post('/Student', data)),
  update: (id, data) => apiCall(() => apiClient.put(`/Student/${id}`, data)),
  // Backend has no DELETE on StudentController — calling this returns 404.
  delete: (id) => apiCall(() => apiClient.delete(`/Student/${id}`)),
};

// ========== COURSE ENDPOINTS ==========
export const courseAPI = {
  getAll: () => apiCall(() => apiClient.get('/Course')),
  getById: (id) => apiCall(() => apiClient.get(`/Course/${id}`)),
  create: (data) => apiCall(() => apiClient.post('/Course', data)),
  update: (id, data) => apiCall(() => apiClient.put(`/Course/${id}`, data)),
  delete: (id) => apiCall(() => apiClient.delete(`/Course/${id}`)),
};

// ========== DEPARTMENT ENDPOINTS ==========
export const departmentAPI = {
  getAll: () => apiCall(() => apiClient.get('/Department')),
  getById: (id) => apiCall(() => apiClient.get(`/Department/${id}`)),
  create: (data) => apiCall(() => apiClient.post('/Department', data)),
  update: (id, data) => apiCall(() => apiClient.put(`/Department/${id}`, data)),
  delete: (id) => apiCall(() => apiClient.delete(`/Department/${id}`)),
};

// ========== INSTRUCTOR ENDPOINTS ==========
export const instructorAPI = {
  getAll: () => apiCall(() => apiClient.get('/Instructor')),
  getById: (id) => apiCall(() => apiClient.get(`/Instructor/${id}`)),
  create: (data) => apiCall(() => apiClient.post('/Instructor', data)),
  update: (id, data) => apiCall(() => apiClient.put(`/Instructor/${id}`, data)),
  delete: (id) => apiCall(() => apiClient.delete(`/Instructor/${id}`)),
};

// ========== ENROLLMENT ENDPOINTS ==========
export const enrollmentAPI = {
  getAll: () => apiCall(() => apiClient.get('/Enrollment')),
  getById: (id) => apiCall(() => apiClient.get(`/Enrollment/${id}`)),
  create: (data) => apiCall(() => apiClient.post('/Enrollment', data)),
  update: (id, data) => apiCall(() => apiClient.put(`/Enrollment/${id}`, data)),
  delete: (id) => apiCall(() => apiClient.delete(`/Enrollment/${id}`)),
  getByStudent: (studentId) =>
    apiCall(() => apiClient.get(`/Enrollment/student/${studentId}`)),
};
