"use client";
import React, { useState } from "react";
import {
    closestCenter,
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableItem from "./Sortableitem";

export default function page() {
  const [items, setItems] = useState([
    { id: "item-1", name: "Item 1" },
    { id: "item-2", name: "Item 2" },
    { id: "item-3", name: "Item 3" },
  ]);
  const [lists, setLists] = useState([
    { id: "list-1", name: "List 1" },
    { id: "list-2", name: "List 2" },
    { id: "list-3", name: "List 3" },
  ]);
  const getItemPos = (id) => items.findIndex((item) => item.id === id);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
  
    const activeGroup = items.find((item) => item.id === active.id)
      ? "items"
      : "lists";
    const overGroup = items.find((item) => item.id === over.id)
      ? "items"
      : "lists";
  
    // Handle sorting within the same group
    if (activeGroup === overGroup) {
      if (activeGroup === "items") {
        setItems((prev) => {
          const originalPos = prev.findIndex((item) => item.id === active.id);
          const newPos = prev.findIndex((item) => item.id === over.id);
          return arrayMove(prev, originalPos, newPos);
        });
      } else {
        setLists((prev) => {
          const originalPos = prev.findIndex((list) => list.id === active.id);
          const newPos = prev.findIndex((list) => list.id === over.id);
          return arrayMove(prev, originalPos, newPos);
        });
      }
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div
    className="grid grid-cols-2 w-[38rem]">
        <DndContext
          sensor={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext  items={items.map((item) => item.id)}>
            <ul className="m-5 p-3 bg-blue-400 ">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id} name={item.name} />
              ))}
            </ul>
          </SortableContext>


          <SortableContext items={lists.map((list) => list.id)}>
            <ul className="m-5 p-3 bg-red-400 ">
              {lists.map((list) => (
                <SortableItem key={list.id} id={list.id} name={list.name} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
        
    </div>
  );
}
