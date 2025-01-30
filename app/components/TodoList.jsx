import React from "react";
import TaskCard from "./TaskCard";
import NoTaskCard from "./NoTaskCard";
import Sort from "./Sort";

export default function TodoList({ todoTaskList, sortOrder, onSortChange }) {
  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div className="rounded-lg bg-indigo-600 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            To-Do ({todoTaskList.length})
          </h3>
          <div>
            <Sort sortOrder={sortOrder} onSortChange={onSortChange} />
          </div>
        </div>
        <div>
          {todoTaskList.length > 0 ? (
            todoTaskList.map((task) => (
              <TaskCard key={task.id} task={task} category="todo" />
            ))
          ) : (
            <NoTaskCard category="todo" />
          )}
        </div>
      </div>
    </div>
  );
}
