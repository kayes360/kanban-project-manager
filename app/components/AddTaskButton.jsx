import React, { useState } from "react";
import { PlusSquaredIcon } from "./SvgIcons"; 
import TaskModal from "./TaskModal";

export default function AddTaskButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen((prev) => !prev);
    };
  return (
    <>
      <div className="flex space-x-2">
        <button
          className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white"
          onClick={toggleModal}
        >
          <PlusSquaredIcon />
          Add
        </button>
      </div>

      {isModalOpen && (
        <TaskModal   onClose={toggleModal} mode="Add" />
      )}
    </>
  );
}
