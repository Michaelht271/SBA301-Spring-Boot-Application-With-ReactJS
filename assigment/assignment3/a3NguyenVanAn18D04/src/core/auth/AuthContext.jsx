import React, {createContext, useState, useEffect, useContext} from 'react';
import {decodeToken, isTokenExpired} from "./jwtUtils.js";


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on load
    const storedToken = localStorage.getItem('token');
    const storedUserStr = localStorage.getItem('user');

    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setIsAuthenticated(true);
      
      if (storedUserStr) {
        try {
          const storedUser = JSON.parse(storedUserStr);
          // Handle 'roles' as a collection from Java if needed during rehydration
          let currentRole = storedUser.role;
          if (storedUser.roles && Array.isArray(storedUser.roles)) {
            const roleObj = storedUser.roles.find(r => (typeof r === 'string' ? r : r.authority)?.startsWith('ROLE_'));
            const roleString = (typeof roleObj === 'string' ? roleObj : roleObj?.authority);
            if (roleString) currentRole = roleString.replace('ROLE_', '');
          }

          const id = storedUser.customerID || storedUser.customerId || storedUser.id;
          const normalizedUser = {
            ...storedUser,
            role: currentRole || 'CUSTOMER',
            customerID: id,
            customerId: id,
            id: id,
            fullName: storedUser.fullName || storedUser.customerFullName,
            customerFullName: storedUser.fullName || storedUser.customerFullName,
          };
          setUser(normalizedUser);
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      } else {

        // Fallback: decode token
        const decoded = decodeToken(storedToken);
        if (decoded) {
            const authorities = decoded.authorities || [];
            const rawRole = authorities.find(a => a.startsWith('ROLE_')) || 'CUSTOMER';
            const normalizedRole = rawRole.replace('ROLE_', '');
            
            const id = decoded.customerID || decoded.customerId || decoded.id;
            setUser({
                email: decoded.sub,
                emailAddress: decoded.sub,
                role: normalizedRole,
                fullName: normalizedRole === 'STAFF' ? 'Staff' : 'Customer',
                customerFullName: normalizedRole === 'STAFF' ? 'Staff' : 'Customer',
                customerID: id,
                customerId: id,
                id: id
            });
        }
      }
    } else {
      // Clear expired token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = (tokenString, userInfo) => {
    // Normalize userInfo before storing
    const normalizedUser = {
        ...userInfo,
        customerID: userInfo.customerID || userInfo.customerId || userInfo.id,
        customerId: userInfo.customerID || userInfo.customerId || userInfo.id,
        id: userInfo.customerID || userInfo.customerId || userInfo.id,
        fullName: userInfo.fullName || userInfo.customerFullName,
        customerFullName: userInfo.fullName || userInfo.customerFullName,
    };
    localStorage.setItem('token', tokenString);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setToken(tokenString);
    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
