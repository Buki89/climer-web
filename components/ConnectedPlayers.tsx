import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user-context";
import socket from "../socket";

type User = {
  userid: string;
  connected: string;
  username: string;
};

const Container = styled("div")`
  border-radius: 1rem;
  padding: 1rem;
  width: 15rem;
  margin-left: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const List = styled("ul")`
  text-align: end;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled("li")`
  font-size: 1rem;
  margin: 0.25rem;
`;

const Title = styled("p")`
  border-bottom: 1px solid grey;
`;

type ConnectedPlayersProps = {};

const ConnectedPlayers: FC<ConnectedPlayersProps> = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    socket.emit("get_players");
    socket.on("get_players", (players: User[]) => {
      setPlayers(players);
    });

    return () => {
      socket.off("get_players");
    };
  }, []);

  return (
    <Container>
      <Title>Player list</Title>
      {players.length === 0 ? (
        <div>no players connected</div>
      ) : (
        <List>
          {players.map((player) => {
            if (player.username === user.username) {
              return (
                <Item key={player.userid}>{`${player.username}(me)`}</Item>
              );
            }
            return <Item key={player.userid}>{player.username}</Item>;
          })}
        </List>
      )}
    </Container>
  );
};

export default ConnectedPlayers;
