import React from "react";
import { Card, CardHeader } from "@mui/material";
import { Container } from "@mui/system";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const Home = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card>
        <CardHeader title={`Welcome`} />
      </Card>
    </Container>
  );
};

export default Home;
