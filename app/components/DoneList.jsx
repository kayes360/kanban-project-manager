import React from 'react'
import { AscSortIcon, DescSortIcon } from './SvgIcons'
import TaskCard from './TaskCard'
import NoTaskCard from './NoTaskCard'
import Sort from './Sort'

export default function DoneList({doneTaskList, sortOrder,onSortChange}) {
  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
          <div className="rounded-lg bg-teal-500 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Done ({doneTaskList.length})</h3>
              <div className="flex">
       <Sort sortOrder={sortOrder} onSortChange={onSortChange}/>
          </div>
            </div>
            <div> 
            {doneTaskList.length > 0 ? (
            doneTaskList.map((task) => (
              <TaskCard key={task.id} task={task} category='done'/>
            ))
          ) : (
            <NoTaskCard category='done'/>
          )}
            </div>
            {/* Add more task cards here */}
          </div>
        </div>
  )
}
