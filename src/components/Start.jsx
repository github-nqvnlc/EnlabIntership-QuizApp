import { Button, Stack } from "@mui/material";
import React from "react";
import logo from "../assets/quiz.png";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} direction="column" justifyContent="space-between">
      <img src={logo} alt="logo" width={200} height={200} />
      <Button
        sx={{
          borderRadius: "30px",
        }}
        onClick={() => navigate("/quizz")}
        variant="contained"
      >
        Start Quiz
      </Button>
    </Stack>
  );
}

export default Start;
