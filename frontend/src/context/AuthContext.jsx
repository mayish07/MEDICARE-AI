import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/api';

const AuthContext = createContext();
export { AuthContext };

export const useAuth = () => useContext(AuthContext);

const getStorage = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStorage = (key, value) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked
  }
};

const removeStorage = (key) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  } catch {
    // Storage blocked
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getStorage('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStorage('token');
      const storedUser = getStorage('user');
      
      if (storedToken && storedUser) {
        if (storedToken.startsWith('google_token_') || storedToken.startsWith('demo_')) {
          setUser(JSON.parse(storedUser));
        } else {
          try {
            const response = await auth.getMe();
            setUser(response.data.user);
          } catch {
            setUser(JSON.parse(storedUser));
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await auth.login({ email, password });
    const { token: jwt, user: userData } = response.data;
    setStorage('token', jwt);
    setStorage('user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
    return userData;
  };

  const register = async (data) => {
    const response = await auth.register(data);
    const { token: jwt, user: userData } = response.data;
    setStorage('token', jwt);
    setStorage('user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
    return userData;
  };

  const loginWithGoogle = (userData) => {
    const newToken = 'google_token_' + Date.now();
    setStorage('token', newToken);
    setStorage('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    removeStorage('token');
    removeStorage('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    setStorage('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, loginWithGoogle, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};