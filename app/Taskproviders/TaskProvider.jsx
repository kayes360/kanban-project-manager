'use client'
import React, { useEffect, useReducer } from "react";
import { TaskContext } from "../context";
import { initialState, taskReducer } from "../reducer/TaskReducer";

export default function TaskProvider({ children }) {
    const storedData = JSON.parse(localStorage.getItem("taskData")) || initialState;
  const [state, dispatch] = useReducer(taskReducer, storedData);

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}