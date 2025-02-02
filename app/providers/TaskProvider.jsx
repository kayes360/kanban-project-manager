"use client";
import React, { useEffect, useReducer, useState } from "react";
import { TaskContext } from "../context";
import { initialState, taskReducer } from "../reducer/TaskReducer";

export default function TaskProvider({ children }) { 
  const [mounted, setMounted] = useState(false); 
  const [state, dispatch] = useReducer(taskReducer, initialState); 
  // Once mounted, load state from localStorage and set up persistence
  useEffect(() => {
    const savedState = localStorage.getItem('taskState');
    if (savedState) {
      dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(savedState) });
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever state changes, but only after mounted
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('taskState', JSON.stringify(state));
    }
  }, [state, mounted]);


  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}