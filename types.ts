export type Position = {
  x: number;
  y: number;
};

export type User = {
  userid: string;
  connected: string;
  username: string;
  room?: string;
  ready: boolean;
};

export type UserPayload = {
  ready: "1" | "0" | undefined;
} & Omit<User, "ready">;

export type Room = {
  id: string;
  roomName: string;
  playerCount: number;
  maxPlayers: number;
  locked?: boolean;
  password?: string;
  admin: string;
  gameStarted: boolean;
};

export type ClimerState = {
  id: string;
  position: Position;
  onMove: boolean;
  score: number;
  height: number;
  hooks: number;
};

export type Category = "Česká přísloví" | "Slavné výroky";

export type BoxProps = Pick<
  React.CSSProperties,
  | "padding"
  | "margin"
  | "flexDirection"
  | "justifyContent"
  | "alignItems"
  | "backgroundColor"
  | "width"
  | "border"
  | "borderRadius"
  | "height"
> & {
  children: React.ReactNode;
};

export type IListenEvents = {
  refresh: () => void;
  room_info: (room: Room) => void;
  players_in_room: (playerList: UserPayload[]) => void;
  updated_user_info: (user: UserPayload) => void;
  leave_room: (done: boolean) => void;
  get_rooms: (rooms: Room[]) => void;
};

export type IEmitEvents = {
  join_room: (roomId: string) => void;
  players_in_room: (roomId: string) => void;
  room_info: (roomId: string) => void;
  change_ready_status: (username: string) => void;
  leave_room: (roomId: string) => void;
  get_rooms: () => void;
  add_room: (room: Room) => void;
};
