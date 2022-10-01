import React, { FC } from "react";
import styled from "styled-components";
import Box from "./Box";

const Container = styled("div")`
  border: 3px solid #fff;
  border-radius: 1rem;
  position: absolute;
  top: 78px;
  right: 20px;
  z-index: 10;
  background-color: #fff;
`;

type RoundProps = {
  round: number;
};

const Round: FC<RoundProps> = ({ round }) => {
  return (
    <Container>
      <Box
        border="4px solid #000"
        borderRadius="1rem"
        justifyContent="center"
        alignItems="center"
        padding="0.5rem"
      >
        <h6>{`Round ${round}`}</h6>
      </Box>
    </Container>
  );
};

export default Round;
