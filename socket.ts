import { io, Socket } from "socket.io-client";
import { IEmitEvents, IListenEvents } from "./types";

const socket: Socket<IListenEvents, IEmitEvents> = io(
  process.env.NEXT_PUBLIC_SERVER_URL,
  {
    autoConnect: false,
    withCredentials: true,
  }
);

export default socket;
