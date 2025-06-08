import { v4 as newid } from "uuid";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Todo from "./Todo";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";
export default function Todolist() {
  // here as you say:  const [task,settask]=useState([]);
  const { tasks, setTasks } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");

  const [Categories, setCategory] = useState("All");
  const [todosjsx, setTodojsx] = useState();
  function handelAddTask() {
    const title = titleInput.trim();
    if (title.length !== 0) {
      setTasks([
        ...tasks,
        { id: newid(), title, details: "", isCompleted: false },
      ]);
      setTitleInput("");
    }
  }
  // filter the c
  useEffect(() => {
    const filteredTasks =
      Categories === "All"
        ? tasks
        : Categories === "Done"
        ? tasks.filter((t) => t.isCompleted)
        : tasks.filter((t) => !t.isCompleted);

    setTodojsx(
      filteredTasks.map((t) => {
        return <Todo key={t.id} todo={t} />;
      })
    );
  }, [Categories, tasks]);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "110vh",
        transform: "scale(0.80)",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#f5f7fa",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0 4px 24px 0 rgba(123,47,242,0.08)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            overflow: "auto",
            paddingBottom: "0",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#7b2ff2" }}>
            my tasks
          </Typography>
          <Divider style={{ width: "100%", background: "#b39ddb" }} />
          <ToggleButtonGroup
            value={Categories}
            color="primary"
            exclusive
            aria-label="Platform"
            sx={{ marginTop: "20px" }}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <ToggleButton
              value="All"
              sx={{
                color: "#7b2ff2",
                "&.Mui-selected": { background: "#ede7f6", color: "#7b2ff2" },
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="Done"
              sx={{
                color: "#43a047",
                "&.Mui-selected": { background: "#e8f5e9", color: "#43a047" },
              }}
            >
              Done
            </ToggleButton>
            <ToggleButton
              value="in-progress"
              sx={{
                color: "#f357a8",
                "&.Mui-selected": { background: "#fce4ec", color: "#f357a8" },
              }}
            >
              in-progress
            </ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ width: "100%", overflow: "auto", flex: 1 }}>
            {todosjsx}
          </Box>
        </CardContent>
        <Divider sx={{ background: "#b39ddb" }} />
        <Box sx={{ p: 2, backgroundColor: "#fff" }}>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%" }}
            alignItems="center"
          >
            <Grid item sx={{ width: "70%" }} xs={12} sm={9}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                sx={{
                  background: "#f5f7fa",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#b39ddb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7b2ff2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7b2ff2",
                    },
                  },
                  input: { color: "#333", fontSize: "1.1rem" },
                }}
              />
            </Grid>
            <Grid item sx={{ width: "26%" }} xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={handelAddTask}
                sx={{
                  height: "56px",
                  fontSize: "1.1rem",
                  background:
                    "linear-gradient(90deg, #7b2ff2 0%,rgb(196, 109, 154) 100%)",
                  color: "#fff",
                  boxShadow: "0 2px 8px 0 rgba(123,47,242,0.10)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #f357a8 0%, #7b2ff2 100%)",
                  },
                  "&:disabled": {
                    background: "gray",
                  },
                }}
                disabled={titleInput.length === 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Typography
        variant="caption"
        sx={{ color: "#666", mt: 2, textAlign: "center" }}
      >
        Your tasks are automatically saved to local storage, so your data will
        persist even after closing or reloading the page
      </Typography>
    </Container>
  );
}
