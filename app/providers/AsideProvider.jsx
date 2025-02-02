"use client";
import {  useContext, useState } from "react";
import { AsideContext } from "../context";
 

export function AsideProvider({ children }) {
  const [isAsideVisible, setAsideVisible] = useState(true);

  const toggleAside = () => {
    setAsideVisible((prev) => !prev);
  };

  return (
    <AsideContext.Provider value={{ isAsideVisible, toggleAside }}>
      {children}
    </AsideContext.Provider>
  );
}

export function useAside() {
  return useContext(AsideContext);
}
