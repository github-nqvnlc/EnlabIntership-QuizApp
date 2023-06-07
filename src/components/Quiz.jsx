import React from "react";
import { Box, Typography, Divider, Stack, Button } from "@mui/material";
import quizData from "../data/quizData";

function Quiz() {
  const [quiz, setQuiz] = React.useState(0);
  const [score, setScore] = React.useState(0);

  console.log(quizData.length);

  const handleSetAnswer = (answer) => {
    if (answer === quizData[quiz].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quiz < 9) {
      setQuiz(quiz + 1);
    } else {
      alert("Your score is " + score + "/10");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography
        sx={{ bgcolor: "#173a5e", color: "#fff", pt: 2, pb: 2 }}
        variant="h6"
        gutterBottom
      >
        Question {quiz + 1}/{quizData.length}
      </Typography>
      <Typography
        sx={{ bgcolor: "#173a5e", color: "#fff", pt: 2, pb: 2 }}
        variant="h6"
        gutterBottom
      >
        Score: {score}
      </Typography>
      <Divider />
      <Stack alignItems="center" spacing={2}>
        <Typography
          sx={{ color: "#fff", pt: 5, pb: 5 }}
          variant="subtitle1"
          gutterBottom
        >
          {quizData[quiz].question}
        </Typography>
        <Stack
          sx={{
            width: "90%",
            mr: 2,
            ml: 2,
          }}
          alignItems="center"
          spacing={2}
        >
          {quizData[quiz].answers.map((answer, index) => (
            <Box
              sx={{
                width: "100%",
                borderRadius: "100px",
                color: "#fff",
                bgcolor: "#aaa",
                pt: 2,
                pb: 2,
                pl: 2,
                textAlign: "left",
              }}
              onClick={() => handleSetAnswer(answer)}
            >
              {answer}
            </Box>
          ))}
        </Stack>
        <Button onClick={() => handleNextQuiz()} color="error">
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default Quiz;
