import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { UserProvider } from "../context/user-context";
import GlobalStyle from "../globalstyles";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
