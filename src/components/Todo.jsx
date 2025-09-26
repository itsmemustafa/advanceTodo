import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { useContext } from "react";
import { Task } from "@mui/icons-material";
export default function Todo({ todo, handleDeleteDialog, handleEditDialog,handleCheckMark }) {

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
                onClick={() => handleCheckMark(todo)}
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
                onClick={() => handleDeleteDialog(todo)}
              >
                {" "}
                <DeleteOutlineIcon />
              </IconButton>

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
                onClick={() => handleEditDialog(todo)}
                disabled={todo.isCompleted}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
