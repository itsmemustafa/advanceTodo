//card
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

//grid
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

//toggle button
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState, useMemo, forwardRef, useContext } from "react";

import { UseTodo } from "../context/TodoContext";
import { useToast } from "../context/toastContext";

import Todo from "./Todo";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Todolist() {
  const { tasks, dispatch } = UseTodo();

  const { showHideToast } = useToast();

  const [titleInput, setTitleInput] = useState("");

  const [Categories, setCategory] = useState("All");

  const [TaskToDelete, setTaskToDelete] = useState();

  const [TaskToUpdate, setTaskToUpdate] = useState();

  const [newUpdateTask, setupdatedTask] = useState("");


  function handelAddTask() {
    dispatch({ type: "add", payload: { titleInput } });
    setTitleInput("");
    showHideToast("task added successfully ");
  }
  function handleDelete() {
    dispatch({ type: "delete", payload: { id:TaskToDelete.id } });
    showHideToast("Task deleted successfully");
    handleClose_DeleteDialog();
  }
  const handelEdit = () => {
    dispatch({ type: "update", payload: { TaskToUpdate, newUpdateTask } });
    showHideToast("Task updated successfully");
    handleClose_EditDialog();
  };

  function handleCheckMark(task) {
    dispatch({ type: "toggle", payload: { id: task.id } });
  }

  // filter the tasks by Categories
  const filteredTasks = useMemo(() => {
    return Categories === "All"
      ? tasks
      : Categories === "Done"
      ? tasks.filter((t) => t.isCompleted)
      : tasks.filter((t) => !t.isCompleted);
  }, [Categories, tasks]);

  // delete dialog handlers
  const [openDeleteDialog, SetopenDeleteDialog] = useState(false);

  const handleOpen_DeleteDialog = (task) => {
    setTaskToDelete(task);
    SetopenDeleteDialog(true);
  };

  const handleClose_DeleteDialog = () => {
    SetopenDeleteDialog(false);
    setTaskToDelete(null);
  };
  //edit dialog handlers

  const [openEditDialog, SetopenEditDialog] = useState(false);

  const handleOpen_EditDialog = (task) => {
    setTaskToUpdate(task);
    setupdatedTask(task.title);
    SetopenEditDialog(true);
  };

  const handleClose_EditDialog = () => {
    SetopenEditDialog(false);
  };
  //render the todos jsx depending on filtered tasks
  const Todos = useMemo(() => {
    return filteredTasks.map((t) => {
      return (
        <Todo
          key={t.id}
          todo={t}
          handleDeleteDialog={handleOpen_DeleteDialog}
          handleEditDialog={handleOpen_EditDialog}
          handleCheckMark={handleCheckMark}
        />
      );
    });
  }, [filteredTasks]);

  return (
    <>
      <Dialog open={openEditDialog} onClose={handleClose_EditDialog}>
        <DialogTitle>Edit Task </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details of your task below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Edit"
            label="Task Title"
            type="Text"
            fullWidth
            variant="standard"
            value={newUpdateTask}
            onChange={(e) => setupdatedTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_EditDialog}>Cancel</Button>
          <span>
            <Button
              onClick={handelEdit}
              disabled={!newUpdateTask || newUpdateTask.trim() === ""}
              sx={{
                backgroundColor:
                  !newUpdateTask || newUpdateTask.trim() === ""
                    ? "#ccc"
                    : "#1976d2",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #7b2ff2 0%, #f357a8 100%)",
                  color: "#fff",
                },
              }}
            >
              SAVE CHANGES
            </Button>
          </span>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose_DeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action cannot be undone !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_DeleteDialog}>Close</Button>
          <Button style={{ color: "red" }} onClick={handleDelete}>
            Remove task
          </Button>
        </DialogActions>
      </Dialog>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "auto", sm: "110vh" },
          transform: { xs: "scale(1)", sm: "scale(0.80)" },
          padding: { xs: 1, sm: 2 },
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
            height: { xs: "auto", sm: "100%" },
            minHeight: { xs: "100vh", sm: "auto" },
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
              padding: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#7b2ff2", fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              My Todo Hustle
            </Typography>
            <Divider style={{ width: "100%", background: "#b39ddb" }} />
            <ToggleButtonGroup
              value={Categories}
              color="primary"
              exclusive
              aria-label="Platform"
              sx={{
                marginTop: "20px",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: { xs: 1, sm: 0 },
              }}
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
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                flex: 1,
                mt: { xs: 2, sm: 0 },
              }}
            >
              {Todos}
            </Box>
          </CardContent>
          <Divider sx={{ background: "#b39ddb" }} />
          <Box sx={{ p: { xs: 1, sm: 2 }, backgroundColor: "#fff" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                width: "100%",
                alignItems: "center",
                mt: 2,
              }}
            >
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
                    height: "56px",
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
                  input: {
                    color: "#333",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handelAddTask}
                disabled={titleInput.length === 0}
                sx={{
                  height: "56px",
                  minWidth: "120px",
                  background:
                    "linear-gradient(90deg, #7b2ff2 0%, #f357a8 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #6a1de0 0%, #e64a9e 100%)",
                  },
                  "&:disabled": {
                    background: "#ccc",
                    color: "#666",
                  },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Card>
        <Typography
          variant="caption"
          sx={{ color: "#666", mt: 2, textAlign: "center" }}
        >
          {" "}
          Your tasks are automatically saved to local storage, so your data will
          persist even after closing or reloading the page
        </Typography>
      </Container>
    </>
  );
}
