import React from "react"; 

export default function NoTaskCard({category}) {
    const categoryColors = {
        todo: "text-indigo",
        inprogress: "text-yellow",
        done: "text-teal",
        revised: "text-rose",
      };
    
      const categoryColor = categoryColors[category] || "text-gray";
  return (
    <div className="mb-4 rounded-lg bg-gray-800 p-4">
      <div className="flex justify-between">
      <h4 className={`mb-2 flex-1 font-semibold ${categoryColor}-500`}>

          No Task is in todo
        </h4>
         
      </div>
      
    </div>
  );
}
