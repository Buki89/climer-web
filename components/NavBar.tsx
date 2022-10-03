import Router from "next/router";
import { FC, useCallback } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user-context";
import Box from "./Box";
import Button from "./Button";

const Title = styled("h1")`
  color: #fff;
  font-size: 2rem;
`;

const Username = styled("h3")`
  color: #fff;
  font-size: 1.25rem;
`;

type NavBarProps = {};

const NavBar: FC<NavBarProps> = () => {
  const { username: user } = useUserContext();

  const logout = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).then((res) => {
        if (res.status > 200) {
          console.log("NOT OK");
        } else {
          console.log("OK");
          Router.push("/");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <Box
      justifyContent="flex-end"
      alignItems="center"
      backgroundColor="#44085a"
      width="100%"
      flexDirection="row"
      padding="0 1rem 0 0"
    >
      <Username>{user?.username}</Username>
      <Button onClick={logout} title="Logout" variant="secondary" />
    </Box>
  );
};

export default NavBar;
