"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { createContext, useState, useEffect, ReactNode } from "react";
import { app } from "../firebase/firebase.config";

// Define the type for the AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleFacebookSignUp: () => Promise<any>;
  handleSignup: (email: string, password: string) => Promise<any>;
  handleLogin: (email: string, password: string) => Promise<any>;
  handleLogout: () => Promise<void>;
  handleGoogleSignin: () => Promise<any>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  setLoading: (state: boolean) => void;
}

// Define the type for children prop
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);
const auth = getAuth(app);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleAuthProvider = new GoogleAuthProvider();
  const facebookAuthProvider = new FacebookAuthProvider();

  // Handle Facebook Sign-Up
  const handleFacebookSignUp = async (): Promise<any> => {
    setLoading(true);
    const result = await signInWithPopup(auth, facebookAuthProvider);
    setLoading(false);
    return result;
  };

  // Handle sign-up with email and password
  const handleSignup = (email: string, password: string): Promise<any> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Handle sign-in with email and password
  const handleLogin = (email: string, password: string): Promise<any> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Handle logout
  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  // Update user profile (display name and photo URL)
  const updateUserProfile = async (
    name: string,
    photo: string
  ): Promise<void> => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    }
  };

  // Handle sign-in with Google
  const handleGoogleSignin = async (): Promise<any> => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleAuthProvider);
    setLoading(false);
    return result;
  };

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Provide authentication-related methods and state
  const authInfo: AuthContextType = {
    user,
    loading,
    handleFacebookSignUp,
    handleSignup,
    handleLogin,
    handleLogout,
    handleGoogleSignin,
    updateUserProfile,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
