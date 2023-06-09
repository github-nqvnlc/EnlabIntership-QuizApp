import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import congrats from "../assets/congrats.png";
import playAgain from "../assets/playagain.png";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  if (state === null || state === undefined) {
    navigate("/");
    return null;
  }
  const { score, time, question } = state;

  return (
    <Stack
      sx={{ width: "100%" }}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ bgcolor: "#fff", width: "auto", p: 5, borderRadius: "20px" }}
      >
        {score && score > 5 ? (
          <>
            <img src={congrats} alt="congrats" width="150px" height="150px" />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Congratulations!
            </Typography>
            <Typography sx={{ color: "#868686" }} variant="h6">
              Amazing good job you!
            </Typography>
          </>
        ) : (
          <>
            <img src={playAgain} alt="playAgain" width="150px" height="150px" />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Completed!
            </Typography>
            <Typography sx={{ color: "#868686" }} variant="h6">
              Better luck next time!
            </Typography>
          </>
        )}
        <Typography
          sx={{ color: "#868686" }}
          variant="h5"
        >{`${score}/${question} correct answers in ${time} seconds`}</Typography>
        <Button
          sx={{
            borderRadius: "30px",
          }}
          variant="contained"
          color="error"
          onClick={() => navigate("/")}
        >
          Play Again
        </Button>
      </Stack>
    </Stack>
  );
}
export default Result;
