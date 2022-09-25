import { Grid, Box } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
};

const gridContainer2 = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column"
};

const gridItem = {
  margin: "8px",
  border: "1px solid red",
};

function NewChat() {
  return (
    <Box sx={gridContainer} >
      <Box sx={gridItem}>Item #1</Box>
      <Box sx={gridItem}>Item #2</Box>
      <Box sx={gridItem}>Item #3</Box>
      <Box sx={gridItem}>
        Item #4 has a long text inside. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Box>
      <Box sx={gridItem}>Item #5</Box>
    </Box>
  )
}

export default NewChat;