
'use client';

import type { User, UserRole } from '@/lib/data';
import { users } from '@/lib/data';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sirahandadn-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('sirahandadn-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string) => {
    setLoading(true);
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('sirahandadn-user', JSON.stringify(foundUser));
      router.push('/dashboard');
    } else {
      // In a real app, you'd show an error.
      // For this mock, we'll just log it.
      console.error('User not found');
      // For demonstration, let's log in the admin if the user is not found
      setUser(users[0]);
      localStorage.setItem('sirahandadn-user', JSON.stringify(users[0]));
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sirahandadn-user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
