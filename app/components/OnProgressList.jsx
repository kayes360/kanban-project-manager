import React from "react"; 
import TaskCard from "./TaskCard";
import NoTaskCard from "./NoTaskCard";
import Sort from "./Sort";

export default function OnProgressList({ inProgressTaskList,sortOrder,onSortChange }) {
  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div className="rounded-lg bg-yellow-500 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            On Progress ({inProgressTaskList.length})
          </h3>
          <Sort sortOrder={sortOrder} onSortChange={onSortChange}/>
        </div>
        {inProgressTaskList.length > 0 ? (
          inProgressTaskList.map((task) => (
            <TaskCard key={task.id} task={task} category="inprogress" />
          ))
        ) : (
          <NoTaskCard category="inprogress" />
        )}
        {/* Add more task cards here */}
      </div>
    </div>
  );
}
