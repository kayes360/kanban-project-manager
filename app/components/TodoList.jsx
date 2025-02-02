import React, { useContext, useId, useState } from "react";
import TaskCard from "./TaskCard";
import NoTaskCard from "./NoTaskCard";
import Sort from "./Sort";
import {
    arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor,  useSensor, useSensors } from "@dnd-kit/core";
import { TaskContext } from "../context";

export default function TodoList({ todoTaskList, sortOrder, onSortChange }) {
      const { state } = useContext(TaskContext);
      console.log(state)
    const [localTodoTaskList,setLocalTodoTaskList] = useState(todoTaskList)

      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      ); 
      const id = useId()
      const getItemPos = (id) => localTodoTaskList.findIndex((task) => task.id === id);
      function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id === over.id)  return; 
        setLocalTodoTaskList((localTodoTaskList) => {
         const originalPos = getItemPos(active.id);
         const newPos = getItemPos(over.id)
         return arrayMove(localTodoTaskList,originalPos,newPos)
        });
        
      }
 
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
        <div className="bg-red-700 p-2">
          {todoTaskList.length > 0 ? (
            <DndContext 
            id={id}
                sensor={sensors} 
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            > 
     
              <SortableContext
                items={ localTodoTaskList.map((item) => item.id)} 
              >
                
                {localTodoTaskList.map((task) => (
                  <TaskCard key={task.id} id={task.id} task={task} category="todo" /> 
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <NoTaskCard category="todo" />
          )}
        </div>
      </div>
      <div>
  <pre>{JSON.stringify(todoTaskList, null, 2)}</pre>
</div>
    </div>
  );
}
