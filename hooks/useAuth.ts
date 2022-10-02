import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/user-context";
import socket from "../socket";

export const useAuth = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  useEffect(() => {
    console.log("useAuth - server", process.env.NEXT_PUBLIC_SERVER_URL);
    console.log("useAuth - env", process.env.VERCEL_ENV);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (response.status === 200) {
          // setUser(response.body)
          const username = await response.json().then((data) => data.username);
          setUser({ username });
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
