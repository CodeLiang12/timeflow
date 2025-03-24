import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@timeflow/types";
import { mockTasks } from "@/mock/index";

interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}

const initialState: TaskState = {
  tasks: mockTasks,
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
