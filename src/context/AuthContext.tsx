"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  emailOrPhone: string;
  phone?: string;
  avatarUrl: string;
  isSellerVerified: boolean;
  walletBalance: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithWhatsAppOtp: (phone: string) => Promise<void>;
  loginWithEmail: (emailOrPhone: string, password?: string) => Promise<void>;
  registerWithEmail: (name: string, emailOrPhone: string, password?: string) => Promise<void>;
  logout: () => void;
  verifyAsSeller: (data: { phone: string; address: string; bankAccount: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("attic_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse local auth user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem("attic_auth_user", JSON.stringify(userData));
  };

  const loginWithGoogle = async () => {
    // Standard user (Pembeli by default)
    const googleUser: UserProfile = {
      id: "usr-" + Date.now().toString().slice(-6),
      name: "Rian Hendrawan",
      emailOrPhone: "rian.hendrawan@gmail.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSellerVerified: false,
      walletBalance: 0,
    };
    saveUserSession(googleUser);
  };

  const loginWithWhatsAppOtp = async (phone: string) => {
    const waUser: UserProfile = {
      id: "usr-" + Date.now().toString().slice(-6),
      name: "Pengguna Attic",
      emailOrPhone: phone.startsWith("+62") ? phone : `+62${phone}`,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSellerVerified: false,
      walletBalance: 0,
    };
    saveUserSession(waUser);
  };

  const loginWithEmail = async (emailOrPhone: string) => {
    const existing = localStorage.getItem("attic_auth_user");
    if (existing) {
      const parsed = JSON.parse(existing);
      if (parsed.emailOrPhone.toLowerCase() === emailOrPhone.toLowerCase()) {
        saveUserSession(parsed);
        return;
      }
    }
    const defaultUser: UserProfile = {
      id: "usr-" + Date.now().toString().slice(-6),
      name: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Pengguna Attic",
      emailOrPhone,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSellerVerified: false,
      walletBalance: 0,
    };
    saveUserSession(defaultUser);
  };

  const registerWithEmail = async (name: string, emailOrPhone: string) => {
    const newUser: UserProfile = {
      id: "usr-" + Date.now().toString().slice(-6),
      name,
      emailOrPhone,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSellerVerified: false,
      walletBalance: 0,
    };
    saveUserSession(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("attic_auth_user");
  };

  const verifyAsSeller = async (data: { phone: string; address: string; bankAccount: string }) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      isSellerVerified: true,
      phone: data.phone,
    };
    saveUserSession(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithWhatsAppOtp,
        loginWithEmail,
        registerWithEmail,
        logout,
        verifyAsSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
