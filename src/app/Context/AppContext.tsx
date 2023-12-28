"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DataType {
  currentGame: string;
  setCurrentGame: Dispatch<SetStateAction<string>>;
}

const initialState: DataType = {
  currentGame: "",
  setCurrentGame: () => null,
};

const AppContext = createContext<DataType>(initialState);

export const AppContextProvider = ({ children }: any) => {
  const [currentGame, setCurrentGame] = useState<string>("");

  const values = {
    currentGame,
    setCurrentGame,
  };
  console.log(values);
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
