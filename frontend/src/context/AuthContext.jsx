import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                withCredentials: true,
            });
            setUser(response.data.user);
            console.log('Fetched user:', response.data.user);
        } catch (err) {
            setUser(null);
            console.error('Fetch user error:', err);
        }finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userData, {
                withCredentials: true,
            });
            if (response.data.message === 'Login successful'){
                console.log('Login successful:', response.data);
                await fetchUser();
                return true;
            }
            return false;   
        } catch (err) {
            setUser(null);
            console.error('Login error:', err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };


    useEffect(() => {
        fetchUser();
        }, []);


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}