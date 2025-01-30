import React from "react";
import NoTaskCard from "./NoTaskCard";
import TaskCard from "./TaskCard"; 
import Sort from "./Sort";

export default function ReviseList({ revisedTaskList,sortOrder, onSortChange }) {
  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div className="rounded-lg bg-rose-500 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Revise ({revisedTaskList.length})
          </h3>
          <Sort  sortOrder={sortOrder} onSortChange={onSortChange}/>

        </div>
        {revisedTaskList.length > 0 ? (
          revisedTaskList.map((task) => (
            <TaskCard key={task.id} task={task} category="revised" />
          ))
        ) : (
          <NoTaskCard category="revised" />
        )}
        {/* Add more task cards here */}
      </div>
    </div>
  );
}
