import Image from "next/image";
import React, { FC } from "react";
import styled from "styled-components";
import { ClimerState } from "../types";
import ClimberIcon from "./ClimberIcon";

const Playground = styled("div")`
  height: 35rem;
  border: 1px solid black;
  position: relative;
`;

// const Climber = styled("div")<{ position?: Position; order: number }>`
//   position: absolute;
//   width: 1rem;
//   height: 1rem;
//   background-color: black;
//   bottom: ${({ position }) => (position ? `${position.y}px` : 0)};
//   left: ${({ order, position }) =>
//     position?.y === -50
//       ? "calc(50% - 0.5rem)"
//       : order === 0
//       ? "calc(25% - 0.5rem)"
//       : "calc(75% - 0.5rem)"};
// `;

type BoardProps = {
  climerState: ClimerState[];
};

const Board: FC<BoardProps> = ({ climerState }) => {
  console.log("render Board");
  return (
    <Playground>
      <Image src="/image.jpg" alt="mountains" layout="fill" />
      {climerState.map((climber, i) => {
        return (
          <ClimberIcon key={climber.id} position={climber.position} order={i} />
        );
      })}
    </Playground>
  );
};

export default Board;

// <Climber key={climber.id} position={climber.position} order={i} />
