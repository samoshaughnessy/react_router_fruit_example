import "./App.css";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Fruits from "./Components/Fruit/Fruits";
import Home from "./Components/Home";
import AddFruit from "./Components/Fruit/Form";
import List from "./Components/Fruit/List";
import Error from "./Components/Error";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link to="/">Home</Link>
            <Link to="/fruits">Fruit</Link>
            <Link to="/fruits/form"> Fruit Form</Link>
            <Link to="/fruits/list">Fruit Lists</Link>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<Fruits />}>
              <Route path="form" element={<AddFruit />} />
              <Route path="list" element={<List />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
