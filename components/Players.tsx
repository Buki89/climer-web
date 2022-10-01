import React, { FC } from "react";
import styled from "styled-components";
import { ClimerState } from "../types";
import Box from "./Box";
import Player from "./Player";
import Timer from "./Timer";

const Container = styled("div")`
  margin-right: 1rem;
  position: absolute;
  top: 78px;
  left: 20px;
  z-index: 10;
`;

type PlayersProps = {
  players: string[];
  userId?: string;
  ready: boolean;
  playersState: ClimerState[];
};

const Players: FC<PlayersProps> = ({ players, playersState }) => {
  return (
    <Container>
      {players.map((player) => {
        const playerState = playersState.find((climer) => climer.id === player);
        return (
          <Box key={player} alignItems="center">
            <Player
              name={player}
              height={playerState?.height || 0}
              hooks={playerState?.hooks || 0}
            />
            <Timer />
          </Box>
        );
      })}
    </Container>
  );
};

export default Players;
