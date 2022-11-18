import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Home = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card>
        <CardHeader title={`Welcome`} />
        <CardContent>
          <Typography>
            MyRecipe Book is a simple application for compiling and saving your
            personal, favorite recipes. Think of it as a replacement for that
            old three-ring binder or the pile of note cards in your kitchen
            drawer.
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
