'use client';
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    isSignedIn: boolean;
    signIn: () => void;
    signOut: () => void;
    profilePic: string | null;
    setProfilePic: (pic: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  profilePic: null,
  setProfilePic: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const storedIsSignedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(storedIsSignedIn);

    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) setProfilePic(storedPic);
  }, []);

  const signIn = () => {
    localStorage.setItem("isSignedIn", "true");
    setIsSignedIn(true);
  };

  const signOut = () => {
    localStorage.setItem("isSignedIn", "false");
    setIsSignedIn(false);
  };

  const handleSetProfilePic = (pic: string | null) => {
    if (pic) {
      localStorage.setItem("profilePic", pic);
    } else {
      localStorage.removeItem("profilePic");
    }
    setProfilePic(pic);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut, profilePic, setProfilePic: handleSetProfilePic }}>
      {children}
    </AuthContext.Provider>
  );
};
