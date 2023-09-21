import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SubMenu from "./Components/SubMenu/SubMenu";

const App = () => {
  return (
    <Router>
      <SubMenu />
    </Router>
  );
};

export default App;
