/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import styled from "styled-components";
import Box from "./Box";

const Container = styled("div")`
  border: 3px solid #fff;
  border-radius: 50%;
  background-color: #fff;
`;

const initialTime = 30 * 1000;
const interval = 1000;

type TimerProps = {};

const Timer: FC<TimerProps> = () => {
  // const [timeLeft, { start }] = useCountDown(initialTime, interval);

  // React.useEffect(() => {
  //   start();
  // }, []);

  return (
    <Container>
      <Box
        border="4px solid #000"
        borderRadius="50%"
        width="45px"
        height="45px"
        justifyContent="center"
        alignItems="center"
      >
        <h6>{30}</h6>
      </Box>
    </Container>
  );
};

export default Timer;
