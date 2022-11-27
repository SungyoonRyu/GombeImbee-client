import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./components/Router";

import { GlobalSyle } from "./styles/globalStyle";
import theme from "./styles/theme"

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalSyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;