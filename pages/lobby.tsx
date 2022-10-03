import { FC, useEffect } from "react";
import styled from "styled-components";
import ConnectedPlayers from "../components/ConnectedPlayers";
import NavBar from "../components/NavBar";
import RoomList from "../components/RoomList";
import { useUserContext } from "../context/user-context";
import { useAuth } from "../hooks/useAuth";
import socket from "../socket";

export type Room = {
  id: number;
  players?: number;
};

const Container = styled("div")`
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 2rem 0;
`;

const Lobby: FC = () => {
  useAuth();

  useEffect(() => {
    socket.emit("join_room", "lobby");
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <RoomList />
        <ConnectedPlayers />
      </Container>
    </>
  );
};

export default Lobby;
