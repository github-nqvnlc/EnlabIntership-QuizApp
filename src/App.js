import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#1C1A5E", height: "100vh" }}>
          <Stack
            sx={{
              width: "100%",
              height: "100%",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/quizz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default App;
