import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import DialgActions from "@mui/material/DialogActions";

import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";
export default function Todo({ todo }) {
  const { tasks, setTasks } = useContext(TodosContext);
  const [updatedTask, setupdatedTask] = useState();
  function handleCheckMark() {
    setTasks(
      tasks.map((t) => {
        if (t.id === todo.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      })
    );
  }

  function handleDelete() {
    setTasks((prev) => prev.filter((t) => t.id !== todo.id));
    handleClose_DeleteDialog();
  }

  function handelEdit() {
    setTasks(
      tasks.map((t) => {
        if (t.id === todo.id) {
          if (updatedTask !== "") return { ...t, title: updatedTask };
          else {
            return { ...t };
          }
        }
        return t;
      })
    );
    handleClose_EditDialog();
  }
  // for Confirm Delete Dialog
  const [openDeleteDialog, SetopenDeleteDialog] = React.useState(false);
  const handleOpen_DeleteDialog = () => {
    SetopenDeleteDialog(true);
  };
  const handleClose_DeleteDialog = () => {
    SetopenDeleteDialog(false);
  };
  //
  // for Edit Task Dialog
  const [openEditDialog, SetopenEditDialog] = React.useState(false);

  const handleOpen_EditDialog = () => {
    SetopenEditDialog(true);
  };

  const handleClose_EditDialog = () => {
    SetopenEditDialog(false);
  };

  return (
    <>
      <Card
        className="todo"
        sx={{
          width: "94%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 24px 0 rgba(123,47,242,0.08)",
          marginTop: 5,
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid size={7}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "solid",
                  color: "#7b2ff2",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "#888" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                size="small"
                sx={{
                  background: todo.isCompleted
                    ? "linear-gradient(90deg, #7b2ff2 0%, #43e97b 100%)"
                    : "#ede7f6",
                  color: todo.isCompleted ? "#fff" : "#7b2ff2",
                  border: todo.isCompleted
                    ? "solid 2.5px #7b2ff2"
                    : "solid 2.5px #b39ddb",
                  transition: "0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #43e97b 0%, #7b2ff2 100%)",
                    color: "#fff",
                  },
                }}
                onClick={() => handleCheckMark()}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                size="small"
                sx={{
                  color: "#f357a8",
                  background: "#fff0fa",
                  border: "solid 2.5px #f357a8",
                  transition: "0.2s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #f357a8 0%, #fff 100%)",
                    color: "#fff",
                  },
                }}
                onClick={handleOpen_DeleteDialog}
              >
                {" "}
                <DeleteOutlineIcon />
              </IconButton>
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

              <IconButton
                className="iconButton"
                size="small"
                sx={{
                  color: "#7b2ff2",
                  background: "#ede7f6",
                  border: "solid 2.5px #b39ddb",
                  transition: "0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #7b2ff2 0%, #f357a8 100%)",
                    color: "#fff",
                  },
                }}
                onClick={handleOpen_EditDialog}
                disabled={todo.isCompleted}
              >
                <EditIcon />
              </IconButton>
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
                    value={updatedTask}
                    onChange={(e) => setupdatedTask(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose_EditDialog}>Cancel</Button>
                  <span>
                    <Button
                      onClick={handelEdit}
                      disabled={!updatedTask || updatedTask.trim() === ""}
                      sx={{
                        backgroundColor:
                          !updatedTask || updatedTask.trim() === ""
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
