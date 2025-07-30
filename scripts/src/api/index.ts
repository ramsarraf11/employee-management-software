import axios from 'axios';

const API_URL = 'http://localhost:50000'; // Update to match the server port

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data.data.token;
};

export const fetchEmployees = async (token: string) => {
  const res = await axios.get(`${API_URL}/employee`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};

export async function addEmployee(data: any, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/employee/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to add employee');
  }
};

export async function  addOrganization(data: any): Promise<void> {
  const response = await fetch(`${API_URL}/organizations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to add organization');
  }
};

