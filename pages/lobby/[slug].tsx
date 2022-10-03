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
import { Room, User, UserPayload } from "../../types";

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
  const { username } = useUserContext();
  const [playerList, SetPlayerList] = useState<User[]>([]);
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  const slug = router.query.slug as string;
  useAuth();

  useEffect(() => {
    console.log("join room", username);
    if (slug && username) {
      socket.emit("join_room", slug);
    }
  }, [slug, username]);

  useEffect(() => {
    socket.emit("players_in_room", slug);
  }, [slug]);

  useEffect(() => {
    socket.on("refresh", () => {
      socket.emit("players_in_room", slug);
    });
    return () => {
      socket.off("refresh");
    };
  }, [slug]);

  useEffect(() => {
    socket.emit("room_info", slug);

    socket.on("room_info", (room: Room) => {
      setRoomInfo(room);
    });

    return () => {
      socket.off("room_info");
    };
  }, [slug]);

  useEffect(() => {
    socket.on("players_in_room", (playerList: UserPayload[]) => {
      console.log("players_in_room");
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
      console.log("updated_user_info", user);
      const transformedUser = {
        ...user,
        ready: user.ready === "1" ? true : false,
      } as User;
      console.log("transformedUser", transformedUser);
      console.log("playerList", playerList);
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
      socket.off("players_in_room");
      socket.off("updated_user_info");
    };
  }, [username, playerList]);

  useEffect(() => {
    socket.on("leave_room", (done: boolean) => {
      console.log("done", done);
      if (done) {
        router.push("/lobby");
      }
    });

    return () => {
      socket.off("leave_room");
    };
  }, [router]);

  const handleReadyStatus = useCallback(() => {
    if (username) {
      console.log("user?.username", username);
      socket.emit("change_ready_status", username);
    }
  }, [username]);

  const handleLeaveRoom = useCallback(() => {
    socket.emit("leave_room", slug);
  }, [slug]);

  const handleStartGame = useCallback(() => {}, []);

  const isAdmin =
    username.length > 0 && roomInfo && username === roomInfo.admin;

  return (
    <>
      <NavBar />
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Container>
          <Title>Players in room</Title>
          <ul>
            {playerList.map((player) => {
              const isRoomAdmin =
                roomInfo &&
                username.length > 0 &&
                roomInfo.admin === player.username;

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
