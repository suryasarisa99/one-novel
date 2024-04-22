import React from "react";
import { UserType } from "@/types/UserTypes";

type DataContextTypes = {
  data: number;
  setData: React.Dispatch<React.SetStateAction<number>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  ShowOverlay: () => void;
  HideOverlay: () => void;
};

export default DataContextTypes;
