/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Box from "./Box";
import Button from "./Button";
import GuesserBoard from "./GuesserBoard";
import NavBar from "./NavBar";
import Players from "./Players";
import Round from "./Round";
import { data } from "../data";
import { useAuth } from "../hooks/useAuth";
import socket from "../socket";
import { ClimerState } from "../types";

const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const defaultValues: ClimerState = {
  id: "",
  onMove: false,
  position: {
    x: 0,
    y: -500,
  },
  score: 0,
  height: 0,
  hooks: 3,
};

const Room: NextPage = () => {
  const router = useRouter();
  const roomId = router.query.id;
  const [players, setPlayers] = useState<string[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [climerState, setClimerState] = useState<ClimerState[]>([
    defaultValues,
  ]);

  useAuth();

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.emit("enter_room");
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("receive_state", (data: ClimerState) => {
  //       console.log("FE receive_state", data);
  //       if (climerState.find((climer) => climer.id === data.id)) {
  //         const newState = climerState.map((climer) => {
  //           if (climer.id === data.id) {
  //             return data;
  //           }
  //           return climer;
  //         });
  //         setClimerState([...newState]);
  //       } else {
  //         const newState = [...climerState];
  //         newState.push(data);
  //         setClimerState([...newState]);
  //       }
  //     });
  //     return () => {
  //       socket.off("receive_state");
  //     };
  //   }
  // }, [socket, climerState]);

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("receive_members", (ids: string[] | undefined) => {
  //       if (ids) {
  //         console.log("FE clientIDs", ids);
  //         setPlayers(ids);
  //       }
  //     });
  //     return () => {
  //       socket.off("receive_members");
  //     };
  //   }
  // }, [socket]);

  const handleReady = useCallback(() => {
    if (socket) {
      const newState = climerState[0];
      newState.id = socket.id;
      newState.position = { y: 0, x: climerState[0].position.x };
      climerState.length === 0 && setClimerState([newState]);
      socket.emit("send_state", newState);
      setReady(true);
    }
  }, [ready, socket, climerState]);

  const handleClimb = useCallback(() => {
    if (socket) {
      const gameState = climerState.map((player) => {
        if (player.id === socket.id) {
          return {
            ...player,
            position: {
              y: player.position.y + 10,
              x: player.position.x,
            },
            height: player.height + 1,
          };
        }
        return player;
      });

      const playerState = gameState.find((player) => player.id === socket.id);

      setClimerState(gameState);

      socket.emit("send_state", playerState);
    }
  }, [socket, climerState]);

  return (
    <Container>
      <NavBar />
      <Box width="100%">
        <Players
          players={players}
          ready={ready}
          userId={socket?.id}
          playersState={climerState}
        />
        <Round round={55} />
        <Box width="100%">
          <Board climerState={climerState} />
          <GuesserBoard
            category="Česká přísloví"
            text={data[41]}
            visibleLetters={[",", "-", "."]}
          />
          <Box margin="1rem 0 0">
            <Button onClick={handleReady}>Ready</Button>
            <Button onClick={handleClimb}>climb</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Room;
