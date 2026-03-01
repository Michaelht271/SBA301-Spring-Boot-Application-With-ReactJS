import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    return jwtDecode(cleanToken);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    const decoded = jwtDecode(cleanToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const getRoleFromToken = (token) => {
  const decoded = decodeToken(token);
  // Assume role is in payload.role or similar
  return decoded?.role || null;
};
