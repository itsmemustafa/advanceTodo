import { createContext ,useReducer,useEffect, useContext } from "react";
import reducer from "../reducers/tasksReducer";

 const TodosContext = createContext([]);

 function getInitialTasks() {
    const stored = localStorage.getItem("Mytodo");
    return stored ? JSON.parse(stored) : [];
  }
  

export const TodoProvider=({children})=>{
const [tasks, dispatch] = useReducer(reducer, [], getInitialTasks);


useEffect(() => {
    localStorage.setItem("Mytodo", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TodosContext.Provider value={{ tasks, dispatch }}>
        {children}
 </TodosContext.Provider>



  )

}
export  const UseTodo=()=>{
    return useContext(TodosContext);
}