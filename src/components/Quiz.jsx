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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { fetchApiData } from "../redux/apiActions";

import { connect } from "react-redux";
import MarkdownDisplay from "./MarkdownDisplay";

function Quiz(props) {
  const navigate = useNavigate();
  const [quiz, setQuiz] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [quizData, setQuizData] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    if (quizData.length === 0) {
      props.fetchApiData();
    }
  }, [quizData]);

  React.useEffect(() => {
    if (props.data?.length > 0) {
      setQuizData(props.data);
      setStartTime(Date.now());
    }
  }, [props.data]);

  React.useEffect(() => {
    if (quizData.length > 0 && quizData[quiz]?.incorrect_answers) {
      setAnswers(
        quizData[quiz]?.incorrect_answers
          .concat(quizData[quiz]?.correct_answer)
          .sort(() => Math.random() - 0.5)
      );
    }
    if (endTime) {
      let time = Math.floor((endTime - startTime) / 1000);
      let question = quizData?.length;
      navigate("/result", { state: { score, time, question } });
      setQuiz(0);
      setScore(0);
    }
  }, [quizData, quiz, endTime, navigate, score, startTime]);

  if (props.loading) {
    return <CircularProgress color="secondary" />;
  }

  if (props.error) {
    return (
      <>
        <Box sx={{ color: "#fff", p: 5 }}>Error: {props.error}</Box>
        <Button
          sx={{
            borderRadius: "30px",
          }}
          variant="contained"
          color="error"
          onClick={() => navigate("/")}
        >
          Back to home
        </Button>
      </>
    );
  }

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === quizData[quiz]?.correct_answer) {
      setScore(score + 1);
    }
    setQuiz(quiz + 1);
    setSelectedAnswer("");
    if (quiz >= quizData?.length - 1) {
      setEndTime(Date.now());
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography sx={{ textAlign: "right", p: 2 }} variant="h6" gutterBottom>
        <CloseIcon
          sx={{ color: "#fff", cursor: "pointer", fontSize: "30px" }}
          onClick={() => navigate("/")}
        />
      </Typography>
      <Typography sx={{ color: "#fff" }} variant="subtitle1" gutterBottom>
        <MarkdownDisplay
          markdownText={`Question ${quiz + 1}/${quizData?.length}`}
        />
      </Typography>
      <Divider />
      <Stack alignItems="center" spacing={5}>
        <Typography sx={{ color: "#fff", p: 5 }} variant="h6" gutterBottom>
          <MarkdownDisplay markdownText={quizData[quiz]?.question} />
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
            {answers?.map((answer, index) => {
              return (
                <FormControlLabel
                  sx={{
                    bgcolor: "transparent",
                    m: 0,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: "100px",
                  }}
                  key={index}
                  value={answer}
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                      }}
                    />
                  }
                  label={<MarkdownDisplay markdownText={answer} />}
                />
              );
            })}
          </RadioGroup>
        </Stack>
        <Button
          sx={{
            width: "60%",
            borderRadius: "100px",
            "&:disabled": {
              backgroundColor: "#c7c7c7",
              color: "#ffffff",
            },
          }}
          onClick={() => {
            handleSubmit();
          }}
          size="large"
          variant="contained"
          color="error"
          disabled={selectedAnswer === ""}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApiData: () => dispatch(fetchApiData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
