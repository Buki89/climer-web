import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth";

type PokusProps = {};

const Pokus: FC<PokusProps> = () => {
  useAuth();
  return <div>pokus</div>;
};

export default Pokus;
