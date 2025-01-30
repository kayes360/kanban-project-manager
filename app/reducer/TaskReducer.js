export const initialState = {
  taskData: [
    {
        "taskName": "Carol Head",
        "description": "Neque et velit enim ",
        "dueDate": "1972-06-17",
        "category": "revised",
        "id": "9f9cb598-ac27-4878-af2b-6a15e52f9add"
    },
    {
        "taskName": "Maggy Hamilton",
        "description": "Nostrum ipsum asperi",
        "dueDate": "1983-08-14",
        "category": "done",
        "id": "ded99467-e75b-4425-b8d1-856ffc724281"
    },
    {
        "taskName": "Hashim Potter",
        "description": "Et pariatur Iure en",
        "dueDate": "2019-05-26",
        "category": "done",
        "id": "6e94a232-06a3-4e33-9fa1-3a0b4b37c275"
    }, 
    {
        "taskName": "Jan 1",
        "description": "Lorem deserunt illo ",
        "dueDate": "1976-01-01",
        "category": "inprogress",
        "id": "fbb20bc1-2523-4901-8192-5b5f2fe4af6a"
    },
    {
        "taskName": "Feb 1",
        "description": "asd",
        "dueDate": "2024-02-01",
        "category": "todo",
        "id": "8b13faec-695e-4284-9aa2-e6b500e8ff8e"
    },
    {
        "taskName": "task todo",
        "description": "Officiis autem conse",
        "dueDate": "2009-05-05",
        "category": "todo",
        "id": "374892f3-bfab-44d9-8122-4322d01a737a"
    },
    {
        "taskName": "task on progress",
        "description": "Culpa sunt dolorem ",
        "dueDate": "1976-09-29",
        "category": "inprogress",
        "id": "7ec95a3c-b175-4e7e-aaa1-5923421bc37e"
    },
    {
        "taskName": "task reviesed",
        "description": "Reprehenderit cum d",
        "dueDate": "2009-02-02",
        "category": "revised",
        "id": "3838f501-f03b-423a-a317-8dcc66bec26f"
    }
]
  
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return {
        taskData: [...state.taskData, action.payload],
      };
    case "EDIT_TASK":
      const updateAbleTask = state.taskData.find(
        (task) => task.id === action.payload.id
      ); 
      if (!updateAbleTask) {
        return state;
      }
      return {
        ...state,
        taskData: state.taskData.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload,
              }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state, // Preserve the rest of the state
        taskData: state.taskData.filter((task) => task.id !== action.payload), // Update the taskData property
      };
    default:
      return state;
  }
};
