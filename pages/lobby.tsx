import { FC } from "react";
import styled from "styled-components";
import Box from "../components/Box";
import ConnectedPlayers from "../components/ConnectedPlayers";
import NavBar from "../components/NavBar";
import RoomList from "../components/RoomList";
import { useAuth } from "../hooks/useAuth";
import { useSocketSetup } from "../hooks/useSocketSetup";

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

const Title = styled("h3")`
  margin-bottom: 2rem;
`;

const Lobby: FC = () => {
  // const router = useRouter();
  // const [rooms, setRooms] = useState<Room[] | undefined>(undefined);
  useAuth();
  // useSocketSetup();

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("connect", () => {
  //       console.log(socket.id);
  //       socket?.emit("get_rooms", socket.id);
  //     });
  //   }
  // }, [socket]);

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("send_rooms", (data: any) => {
  //       console.log("data - ", data);
  //     });
  //   }
  // }, [socket]);

  // const handleClick = useCallback(() => {
  //   const newRoomsState = rooms || [];
  //   newRoomsState.push({ id: rooms ? rooms.length + 1 : 1 });
  //   setRooms(newRoomsState);
  //   if (newRoomsState.length === 1 && socket) {
  //     socket.emit("join_room", "1");
  //     router.push({
  //       pathname: "/room/[id]",
  //       query: { id: 1 },
  //     });
  //   }
  // }, [rooms, router, socket]);

  return (
    <>
      <NavBar />
      <Container>
        <RoomList />
        <ConnectedPlayers />
      </Container>
      {/* <Button onClick={handleClick}>join game</Button> */}

      {/* {!rooms ? (
        <Typography variant="body1">no rooms</Typography>
      ) : (
        <RoomList rooms={rooms} />
      )} */}
    </>
  );
};

export default Lobby;
