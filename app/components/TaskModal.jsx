import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "@/app/context";

export default function TaskModal({ onClose, mode, task }) {
  const { state, dispatch } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    taskName: task?.taskName || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    category: task?.category || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { taskName, description, dueDate, category } = formData;
    const errors = {};

    // Validation for individual fields
    if (!taskName) errors.taskName = "Task name is required!";
    if (!description) errors.description = "Description is required!";
    if (!dueDate) errors.dueDate = "Due date is required!";
    if (!category) errors.category = "Category is required!";

    // Display exclusive warnings for each field
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) =>
        toast.error(message)
      );

      // If all fields are empty, show a generic message
      if (Object.keys(errors).length === 4) {
        toast.error("All fields are required!");
      }
      return;
    }
     
    if (mode === "Add") {
        const newFormData = {
            ...formData,
            id: crypto.randomUUID(),
          };
      dispatch({ type: "CREATE_TASK", payload: newFormData });
      onClose();
    }
    if (mode === "Edit") {
        const newFormData = {
            ...formData,
            id: task.id
          };
      dispatch({ type: "EDIT_TASK", payload: newFormData });
      onClose(); 
    }
    setFormData({
      taskName: "",
      description: "",
      dueDate: "",
      category: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4 max-h-[90vh] overflow-auto">
          <div className="w-full mx-auto max-w-md rounded-lg bg-gray-800 shadow-xl">
            <div className="p-6">
              <h2 className="mb-6 text-2xl font-bold text-green-400">
                {mode === "Add" && "Create "}
                {mode === "edit" && "Edit "} Task
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="taskName"
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dueDate"
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a category</option>
                    <option value="todo">To-Do</option>
                    <option value="inprogress">On Progress</option>
                    <option value="done">Done</option>
                    <option value="revised">Revised</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    {mode === "Add" ? "Create Task" : "Edit Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
