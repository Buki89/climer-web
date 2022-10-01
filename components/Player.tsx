import React, { FC } from "react";
import styled from "styled-components";
import Box from "./Box";

const Container = styled("div")`
  border: 4px solid black;
  border-radius: 1rem;
`;

const Height = styled("div")`
  background-color: #75d4ff;
  flex: 3;
  border-radius: 0 0 12px 0;
  text-align: right;
`;

const Hooks = styled("div")`
  background-color: #fece02;
  padding: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Name = styled("div")<{ isMe: boolean }>`
  background-color: ${({ isMe }) => (isMe ? "#fece02" : "#fff")};
  padding: 0.5rem;
  border-radius: 12px 12px 0 0;
`;

type PlayerProps = {
  name: string;
  hooks: number;
  height: number;
};

const Player: FC<PlayerProps> = ({ name, hooks, height }) => {
  const socket = null;

  return (
    <Box
      border="3px solid #fff"
      width="15.625rem"
      borderRadius="1rem"
      margin="0 0.5rem 0 0"
    >
      <Container>
        <Name isMe={socket?.id === name}>
          {/* <Typography variant="body1" color="#000" fontWeight={700}>
            {name}
          </Typography> */}
          <p>{name}</p>
        </Name>
        <Box>
          <Hooks>I I I</Hooks>
          <Height>
            {/* <Typography
              variant="body1"
              color="#000"
              m="0.5rem"
              fontWeight={600}
            >
              {`${height}m`}
            </Typography> */}
            <p>{`${height}m`}</p>
          </Height>
        </Box>
      </Container>
    </Box>
  );
};

export default Player;
