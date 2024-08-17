import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import Home from "./components/Home.js";
import NavBar from './NavBar';
import Register from './components/Register.js'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Edit from "./components/Edit.js";
import Detail from "./components/Detail.js";

function App() {
  return (
    <>
    <Router>
    <NavBar/>
    <Routes>
      <Route  exact path="/" Component={Home}/>
      <Route path="/register" Component={Register}/>
      <Route path="/edit/:id" Component={Edit}/>
      <Route path="view/:id" Component={Detail}/>
    </Routes>

    </Router>
    
    


    </>
    
  );
}

export default App;
