"use client";
import { AuthContext } from "@/context";
import { useContext } from "react";

const useContexts = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContexts must be used within an AuthProvider");
  }

  return context;
};

export default useContexts;
