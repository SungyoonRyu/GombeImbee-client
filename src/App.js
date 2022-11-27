import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./components/Router";

import GraphView from './components/view/GraphView';
import theme from "./theme"

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;