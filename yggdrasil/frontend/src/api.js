// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const fetchHomeData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/home`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};