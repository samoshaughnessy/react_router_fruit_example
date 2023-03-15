import "./App.css";
import { BrowserRouter, Routes, Link, Route, Navigate } from "react-router-dom";
import Fruits from "./Components/Fruit/Fruits";
import Home from "./Components/Home";
import AddFruit from "./Components/Fruit/Form";
import List from "./Components/Fruit/List";
import Error from "./Components/Error";
import Login_Signup_Form from "./Components/Login_SignupForm";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import React from "react";

export const UserContext = React.createContext({});

function RequireAuth({ children, redirectTo, user }) {
  console.log(user);
  const isAuthenticated = user.uid && user.accessToken;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (userObj) => {
      if (userObj) {
        setUser(userObj);
      }
    });
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <UserContext.Provider value={user}>
            <div>
              <Link to="/">Home</Link>
              {user.uid && user.accessToken ? null : (
                <Link to="/login">Login</Link>
              )}

              <Link to="/fruits">Fruit</Link>

              <Link to="/fruits/list">Fruit Lists</Link>
              {user.uid && user.accessToken ? (
                <Link to="/fruits/form"> Fruit Form</Link>
              ) : null}

              {user.uid && user.accessToken ? (
                <button
                  onClick={() =>
                    signOut(auth).then(() => {
                      setUser({});
                    })
                  }
                >
                  signOut
                </button>
              ) : null}
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login_Signup_Form />} />
              <Route path="/fruits" element={<Fruits />}>
                <Route
                  path="form"
                  element={
                    <RequireAuth redirectTo="/login" user={user}>
                      <AddFruit />
                    </RequireAuth>
                  }
                />

                <Route path="list" element={<List />} />
              </Route>

              <Route path="*" element={<Error />} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
