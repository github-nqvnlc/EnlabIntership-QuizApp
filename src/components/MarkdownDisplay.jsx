import React from "react";
import ReactMarkdown from "react-markdown";

function MarkdownDisplay({ markdownText }) {
  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
}

export default MarkdownDisplay;
