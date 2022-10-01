import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../../components/Box";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import { useUserContext } from "../../context/user-context";
import { useAuth } from "../../hooks/useAuth";
import socket from "../../socket";
import { Room } from "../../types";

type User = {
  userid: string;
  connected: string;
  username: string;
  room?: string;
  ready: boolean;
};

type UserPayload = {
  ready: "1" | "0" | undefined;
} & Omit<User, "ready">;

const Badge = styled("div")<{ ready: boolean }>`
  height: 15px;
  width: 15px;
  background-color: ${({ ready }) => (ready ? "#0F0" : "#F00")};
  border-radius: 50%;
  margin-right: 2rem;
  border: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  width: 15rem;
  margin-left: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 70vh;
  margin-top: 2rem;
  width: 25rem;
  ul {
    flex: 1;
    list-style: none;
  }
`;

const Title = styled("p")`
  border-bottom: 1px solid grey;
`;

const Slug: NextPage = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [playerList, SetPlayerList] = useState<User[]>([]);
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  const slug = router.query.slug;
  useAuth();

  useEffect(() => {
    socket.on("a_new_user_has_joined_the_room", () => {
      console.log("new member has joined the room");
    });

    return () => {
      socket.off("a_new_user_has_joined_the_room");
    };
  }, []);

  useEffect(() => {
    console.log("join room", user?.username);
    if (slug && user && user.username) {
      socket.emit("join_room", slug, user.username);
    }
  }, [slug, user?.username]);

  useEffect(() => {
    socket.emit("get_players_in_same_room", slug);
  }, [slug]);

  useEffect(() => {
    socket.emit("get_room_info", slug);

    socket.on("get_room_info", (room: Room) => {
      setRoomInfo(room);
    });

    return () => {
      socket.off("get_room_info");
    };
  }, [slug]);

  useEffect(() => {
    socket.on("get_players_in_same_room", (playerList: UserPayload[]) => {
      const newArr = playerList.map((player) => {
        if (player.ready === undefined) {
          return {
            ...player,
            ready: false,
          };
        }
        if (player.ready !== undefined) {
          return { ...player, ready: player.ready === "1" ? true : false };
        }
      });
      SetPlayerList(newArr as unknown as User[]);
    });

    socket.on("updated_user_info", (user: UserPayload) => {
      const transformedUser = {
        ...user,
        ready: user.ready === "1" ? true : false,
      } as User;
      const newArr = playerList.map((player) => {
        if (player.userid === transformedUser.userid) {
          return transformedUser;
        } else {
          return player;
        }
      });
      SetPlayerList(newArr);
    });

    return () => {
      socket.off("get_players_in_same_room");
      socket.off("updated_user_info");
    };
  }, [user, playerList]);

  const handleReadyStatus = useCallback(() => {
    if (user?.username) {
      socket.emit("change_ready_status", user.username);
    }
  }, [user?.username]);

  const handleLeaveRoom = useCallback(() => {
    socket.emit("leave_room", slug);
    router.push("/lobby");
  }, [slug]);

  const handleStartGame = useCallback(() => {}, []);

  const isAdmin = user && roomInfo && user.username === roomInfo.admin;

  return (
    <>
      <NavBar />
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Container>
          <Title>Players in room</Title>
          <ul>
            {playerList.map((player) => {
              const isRoomAdmin =
                roomInfo && user && roomInfo.admin === player.username;

              return (
                <li key={player.userid}>
                  <Box
                    key={player.userid}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Badge
                      ready={player.ready === undefined ? false : player.ready}
                    />
                    <span>{player.username}</span>
                    {isRoomAdmin && <span>{" - (admin)"}</span>}
                  </Box>
                </li>
              );
            })}
          </ul>
          {isAdmin && (
            <Button
              variant="primary"
              title="Start game"
              onClick={handleStartGame}
              disabled={!playerList.every((player) => player.ready)}
            />
          )}
          <Button variant="action" title="Ready" onClick={handleReadyStatus} />
          <Button
            variant="secondary"
            title="Leave room"
            onClick={handleLeaveRoom}
          />
        </Container>
      </Box>
    </>
  );
};

export default Slug;
