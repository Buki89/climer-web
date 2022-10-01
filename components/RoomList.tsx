import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import { Room } from "../types";
import Box from "./Box";
import Button from "./Button";
import { Modal } from "./Modal";
import FlexLink from "next/link";
import socket from "../socket";
import { useRouter } from "next/router";

const Link = styled("a")`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  margin: 0.25rem 0;
  padding: 0 0.5rem;
  cursor: pointer;
  :hover {
    background-color: #e1dfdf;
  }
`;

const Container = styled("div")`
  border-radius: 1rem;
  padding: 1rem;
  width: 15rem;
  margin-right: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Title = styled("p")`
  border-bottom: 1px solid grey;
`;

const Disabled = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  margin: 0.25rem 0;
  color: grey;
`;

type RoomListProps = {};

const RoomList: FC<RoomListProps> = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { isShowing, toggle } = useModal();
  const router = useRouter();

  useEffect(() => {
    socket.emit("get_rooms");

    socket.on("get_rooms", (newRooms: Room[]) => {
      console.log("GET ROOMS  - newRooms", newRooms);
      setRooms(newRooms);
    });

    return () => {
      socket.off("get_rooms");
    };
  }, []);

  useEffect(() => {
    socket.on("refresh", () => {
      socket.emit("get_rooms");
    });

    return () => {
      socket.off("refresh");
    };
  }, []);

  const createRoom = useCallback(
    (room: Room) => {
      const newRoomsList = [...rooms];
      newRoomsList.push(room);
      setRooms(newRoomsList);
      toggle();
      socket.emit("add_room", room);
      router.push(`/lobby/${room.id}`);
    },
    [rooms, isShowing]
  );

  return (
    <Container>
      <Title>Rooms list</Title>
      <Button onClick={toggle} title="Create room" />
      <Modal isShowing={isShowing} hide={toggle} createRoom={createRoom} />
      <Box>
        {rooms.map((room) => {
          if (room.playerCount == room.maxPlayers) {
            return (
              <Disabled key={room.id}>
                <p>{room.roomName}</p>
                <p>{`${room.playerCount || 0}/${room.maxPlayers}`}</p>
              </Disabled>
            );
          }

          return (
            <FlexLink
              href={`/lobby/[slug]`}
              as={`lobby/${room.id}`}
              key={room.id}
              replace={true}
            >
              <Link>
                <p>{room.roomName}</p>
                <p>{`${room.playerCount || 0}/${room.maxPlayers}`}</p>
              </Link>
            </FlexLink>
          );
        })}
      </Box>
    </Container>
  );
};

export default RoomList;
