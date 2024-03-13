import Client from "./Client";
import DisplayAllClients from "./DisplayAllClients";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
 return(
  <div>
      <Router>
        <Routes>

          <Route element={<Client/>} path={'/client'}/>
          <Route element={<DisplayAllClients/>} path={'/displayallclient'}/>
   
        </Routes>
      </Router>
    </div>
 )
}

export default App;
