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


// var testData = {
//   "nodes": [
//       { 
//           "id": "name1",
//           "group": "group1"
//       },
//       { 
//           "id": "name2",
//           "group": "group1"
//       },
//       { 
//           "id": "name3",
//           "group": "group2"
//       },
//       { 
//           "id": "somename",
//           "group": "group1"
//       }
//   ], 
//   "links": [
//       {
//           "source": "name1",
//           "target": "name2"
//       },
//       {
//           "source": "name1",
//           "target": "name3"
//       },
//       {
//           "source": "name1",
//           "target": "somename"
//       }
//   ] 
// }