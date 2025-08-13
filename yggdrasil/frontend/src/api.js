const API_BASE_URL = 'http://localhost:5000/api/users';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    console.log('Sending to backend:', userData);
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      throw new Error(
        errorData.message || 
        errorData.error || 
        `Signup failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Full signup error:', error);
    throw error;
  }
};

export const fetchHomeData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/home`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch home data');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch home data error:', error);
    throw error;
  }
};