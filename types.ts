export type Position = {
  x: number;
  y: number;
};

export type Room = {
  id: string;
  roomName: string;
  playerCount: number;
  maxPlayers: number;
  locked?: boolean;
  password?: string;
  admin: string;
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
