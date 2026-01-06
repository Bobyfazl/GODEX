
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password?: string; // stored for simulation purposes in localStorage
  role?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  // Recovery methods
  sendRecoveryEmail: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string, newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple heuristic for gender detection to assign avatars
const isFemaleName = (name: string): boolean => {
  const femaleNames = [
    'zahra', 'fatemeh', 'maryam', 'sara', 'narges', 'zeinab', 'masoumeh', 'elaheh', 'elham', 'parisa',
    'nazanin', 'mahsa', 'leila', 'mina', 'samira', 'shirin', 'bahar', 'mona', 'vida', 'negine',
    'ana', 'maria', 'julia', 'sophia', 'emma', 'olivia', 'ava', 'isabella', 'mia', 'charlotte',
    'helia', 'hasti', 'asal', 'baran', 'aysan', 'alma', 'dorsa', 'setayesh'
  ];
  const n = name.toLowerCase().trim();
  return femaleNames.some(fn => n.includes(fn) || n === fn);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load active session on mount - INSTANTLY to prevent avatar delay
  useEffect(() => {
    const session = localStorage.getItem('godex_active_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        console.warn('Failed to parse session', e);
        localStorage.removeItem('godex_active_session');
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to get users DB safely
  const getUsersDB = (): User[] => {
    try {
        const db = localStorage.getItem('godex_users_db');
        return db ? JSON.parse(db) : [];
    } catch (e) {
        console.error('Database corruption detected, resetting users db', e);
        localStorage.removeItem('godex_users_db');
        return [];
    }
  };

  // Helper to save users DB
  const saveUserToDB = (newUser: User) => {
    const users = getUsersDB();
    // Check if user already exists, if so update, else push
    const index = users.findIndex(u => u.email === newUser.email);
    if (index >= 0) {
      users[index] = newUser;
    } else {
      users.push(newUser);
    }
    localStorage.setItem('godex_users_db', JSON.stringify(users));
  };

  const login = async (email: string, pass: string) => {
    // Reduced delay for snappier feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsersDB();
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      throw new Error('NOT_FOUND');
    }

    if (foundUser.password !== pass) {
      throw new Error('رمز عبور اشتباه است.');
    }

    // Login successful
    const { password, ...sessionUser } = foundUser;
    setUser(sessionUser as User);
    localStorage.setItem('godex_active_session', JSON.stringify(sessionUser));
  };

  const signup = async (name: string, email: string, pass: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getUsersDB();
    if (users.find(u => u.email === email)) {
      throw new Error('این ایمیل قبلاً ثبت شده است.');
    }

    // Determine avatar based on gender guess
    const gender = isFemaleName(name) ? 'girl' : 'boy';
    const avatarUrl = `https://avatar.iran.liara.run/public/${gender}?username=${name}`;

    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: avatarUrl,
      password: pass,
      role: 'کاربر استاندارد',
      bio: '' // Set to empty string so placeholder works
    };

    saveUserToDB(newUser);
    
    // Auto login after signup
    const { password, ...sessionUser } = newUser;
    setUser(sessionUser as User);
    localStorage.setItem('godex_active_session', JSON.stringify(sessionUser));
  };

  const updateProfile = async (data: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Short simulated delay
    
    if (!user) return;

    // Merge new data
    const updatedUser = { ...user, ...data };
    
    // Update State
    setUser(updatedUser);
    
    // Update LocalStorage Session
    localStorage.setItem('godex_active_session', JSON.stringify(updatedUser));

    // Update Database
    const users = getUsersDB();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
        // Keep the password from the DB
        users[index] = { ...users[index], ...data };
        localStorage.setItem('godex_users_db', JSON.stringify(users));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('godex_active_session');
  };

  // Recovery Logic
  const sendRecoveryEmail = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = getUsersDB();
    if (!users.find(u => u.email === email)) {
      throw new Error('حساب کاربری با این ایمیل وجود ندارد.');
    }
    localStorage.setItem(`recovery_code_${email}`, '1234');
  };

  const verifyOtp = async (email: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedCode = localStorage.getItem(`recovery_code_${email}`);
    if (storedCode !== code) {
      throw new Error('کد وارد شده صحیح نمی‌باشد.');
    }
  };

  const resetPassword = async (email: string, newPass: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = getUsersDB();
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) throw new Error('کاربر یافت نشد.');

    users[userIndex].password = newPass;
    localStorage.setItem('godex_users_db', JSON.stringify(users));
    localStorage.removeItem(`recovery_code_${email}`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      updateProfile,
      logout,
      sendRecoveryEmail,
      verifyOtp,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
