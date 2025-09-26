import { v4 as newid } from "uuid";

export default function reducer(currentTodo, action) {
  switch (action.type) {
    case "add": {
      const title = action.payload.titleInput.trim();

      if (title.length === 0) {
        return currentTodo;
      }
      const updatedTodos = [
        ...currentTodo,
        { id: newid(), title, details: "", isCompleted: false },
      ];

      return updatedTodos;
    }
    case "delete": {
      return currentTodo.filter((t) => t.id !== action.payload.id);
    }

    case "update": {
      if (!action.payload.TaskToUpdate) return currentTodo;

      return currentTodo.map((t) => {
        if (t.id === action.payload.TaskToUpdate.id) {
          if (action.payload.newUpdateTask.trim() !== "")
            return { ...t, title: action.payload.newUpdateTask };
          else {
            return { ...t };
          }
        }
        return t;
      });
    }
    case "get": {
      const storedTasks = localStorage.getItem("Mytodo");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    case "toggle": {
      return currentTodo.map((t) =>
        t.id === action.payload.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
