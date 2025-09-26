import Todolist from "./components/Todolist";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { useReducer, useEffect } from "react";
import { TaostProvider } from "./context/toastContext";
import reducer from "./reducers/tasksReducer";

function App() {
 
  return (
    <>
      <TaostProvider>
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
          <TodoProvider>
            <Todolist />
          </TodoProvider>
        </div>
      </TaostProvider>
    </>
  );
}

export default App;
