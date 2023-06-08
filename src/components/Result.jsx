import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { score } = location.state;

  return <div>{score}</div>;
}

export default Result;
