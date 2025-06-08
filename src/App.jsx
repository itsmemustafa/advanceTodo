import Todolist from "./components/Todolist";
import "./App.css";
import { TodosContext } from "./context/TodoContext";
import { useEffect, useState } from "react";

// to get the tasks from local storage
const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("Mytodo");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

function App() {
  const [tasks, setTasks] = useState(getInitialTasks);

  // to store the task and upoluod them to local storage
  useEffect(() => {
    localStorage.setItem("Mytodo", JSON.stringify(tasks));
  }, [tasks]); //  << it runs only if tasks updated

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3e8ff",
      }}
    >
      <TodosContext.Provider value={{ tasks, setTasks }}>
        <Todolist />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
