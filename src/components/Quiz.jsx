import React from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import quizData from "../data/quizData";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  React.useEffect(() => {
    if (quiz > quizData.length - 1) {
      navigate("/result", { state: { score: score } });
    }
  }, [quiz]);

  const handleSubmit = () => {
    if (selectedAnswer === "") {
      alert("Please select an answer");
    } else {
      if (selectedAnswer === quizData[quiz]?.correctAnswer) {
        setScore(score + 1);
      }
      setQuiz(quiz + 1);
      setSelectedAnswer("");
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
          {quizData[quiz]?.question}
        </Typography>
        <Stack
          sx={{
            width: "100%",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <RadioGroup
            sx={{
              width: "90%",
              gap: "10px",
            }}
            value={selectedAnswer}
            onChange={handleChange}
          >
            {quizData[quiz]?.answers.map((answer, index) => (
              <FormControlLabel
                sx={{
                  bgcolor: "#d1d1d1",
                  color: "#000",
                  borderRadius: "100px",
                }}
                key={index}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
          </RadioGroup>
        </Stack>
        <Button onClick={() => handleSubmit()} color="error">
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default Quiz;
