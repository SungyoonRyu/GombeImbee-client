import { RouteContext } from "react-router/dist/lib/context";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import './App.css';
import Router from "./components/Router";


function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
