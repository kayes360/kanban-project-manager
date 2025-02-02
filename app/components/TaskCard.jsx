 
import React, { useContext, useState } from "react";
import { DeleteIcon, EditIcon } from "./SvgIcons";
import TaskModal from "./TaskModal";
import { TaskContext } from "../context";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { useDndMonitor } from "@dnd-kit/core";
export default function TaskCard({ task, category }) { 
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: task.id});
      const style ={
        transition,
        transform: CSS.Transform.toString(transform)
      }
  const { state, dispatch } = useContext(TaskContext);

  const categoryColors = {
    todo: "text-indigo",
    inprogress: "text-yellow",
    done: "text-teal",
    revised: "text-rose",
  };

  const categoryColor = categoryColors[category] || "text-gray";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleDelete = (taskId) => { 
    dispatch({ type: "DELETE_TASK", payload: taskId });

   }
  
  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="mb-4 rounded-lg bg-gray-800 p-4 cursor-move">
        <div className="flex justify-between">
          <h4 className={`mb-2 flex-1 font-semibold ${categoryColor}-500`}>
            {task.taskName}
          </h4>
          <div className="flex gap-2">
            <div onClick={() => { handleDelete(task.id) }}>
                <DeleteIcon /> 
            </div>
            <div onClick={toggleModal}>
              <EditIcon />
            </div>
          </div>
        </div>
        <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
        <p className="mt-6 text-xs text-zinc-400">{task.dueDate}</p>
      </div>

      {isModalOpen && <TaskModal onClose={toggleModal} mode="Edit" task={task} />}
    </>
  );
}
