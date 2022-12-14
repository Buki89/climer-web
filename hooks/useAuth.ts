import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/user-context";
import socket from "../socket";

export const useAuth = () => {
  const router = useRouter();
  const { setUsername } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const username = await response.json().then((data) => data.username);
          setUsername(username);
          socket.connect();
          router.route === "/" && router.push("/lobby");
        }

        if (response.status === 401) {
          router.push("/");
        }
      } catch (err) {
        console.error("err", err);
      }
    };
    fetchData();
  }, []);
};
