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
  loginWithGoogle: (email: string, name: string) => Promise<void>;
  loginWithWhatsAppOtp: (phone: string, code?: string) => Promise<void>;
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

  const loginWithGoogle = async (email: string, name: string) => {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Gagal autentikasi Google.");
    }
    saveUserSession(data.user);
  };

  const loginWithWhatsAppOtp = async (phone: string, code: string = "1234") => {
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "VERIFY", phone, code }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Kode OTP salah atau tidak cocok.");
    }
    saveUserSession(data.user);
  };

  const loginWithEmail = async (emailOrPhone: string, password?: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: emailOrPhone, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Email/No. WhatsApp atau kata sandi tidak cocok.");
    }
    saveUserSession(data.user);
  };

  const registerWithEmail = async (name: string, emailOrPhone: string, password?: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, identifier: emailOrPhone, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Gagal mendaftarkan akun baru.");
    }
    saveUserSession(data.user);
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
