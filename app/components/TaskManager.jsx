'use client'
import React from 'react'
import { useContext, useState } from "react";
import AddTaskButton from "@/app/components/AddTaskButton";

import DoneList from "@/app/components/DoneList";
import OnProgressList from "@/app/components/OnProgressList";
import ReviseList from "@/app/components/ReviseList";
import TodoList from "@/app/components/TodoList";
import { TaskContext } from "@/app/context";
import Header from "@/app/components/Header";
export default function TaskManager() {
    const { state } = useContext(TaskContext);

    // Separate sortOrder for each list
    const [sortOrder, setSortOrder] = useState({
      todo: "asc",
      inprogress: "asc",
      done: "asc",
      revised: "asc",
    });
  
    const handleSortChange = (category, order) => {
      setSortOrder((prev) => ({
        ...prev,
        [category]: order,
      }));
    };
  
    const [searchTerm, setSearchTerm] = useState("");
    const filterTasks = (state, searchTerm) => {
      return state.taskData.filter((task) =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  
    const sortTasks = (tasks, order) => {
      return tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
    };
  
    const todoTaskList = sortTasks(
      filterTasks(state, searchTerm).filter((task) => task.category === "todo"),
      sortOrder.todo
    );
    const inProgressTaskList = sortTasks(
      filterTasks(state, searchTerm).filter(
        (task) => task.category === "inprogress"
      ),
      sortOrder.inprogress
    );
    const doneTaskList = sortTasks(
      filterTasks(state, searchTerm).filter((task) => task.category === "done"),
      sortOrder.done
    );
    const revisedTaskList = sortTasks(
      filterTasks(state, searchTerm).filter(
        (task) => task.category === "revised"
      ),
      sortOrder.revised
    );
  return (
    <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Projectify</h2>
          <AddTaskButton />
        </div>
        <div className="-mx-2 mb-6 flex flex-wrap">
          {/* Todo */}
          <TodoList
            todoTaskList={todoTaskList}
            sortOrder={sortOrder.todo}
            onSortChange={(order) => handleSortChange("todo", order)}
          />
          {/* On Progress */}
          <OnProgressList
            inProgressTaskList={inProgressTaskList}
            sortOrder={sortOrder.inprogress}
            onSortChange={(order) => handleSortChange("inprogress", order)}
          />
          {/* Done */}
          <DoneList
            doneTaskList={doneTaskList}
            sortOrder={sortOrder.done}
            onSortChange={(order) => handleSortChange("done", order)}
          />
          <ReviseList
            revisedTaskList={revisedTaskList}
            sortOrder={sortOrder.revised}
            onSortChange={(order) => handleSortChange("revised", order)}
          />
        </div>
      </div>
    </div>
  )
}
