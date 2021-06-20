import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CollectSkinOrder from "./components/CollectSkinOrder";
import { UserinfoContext } from "./Context/SkinOrderContext";
import UploadFile from "./components/uploadFile";
import NavBar from "./components/NavBar";
import AdminPagecontroller from "./components/admin/AdminPageController";
import jwt_decode from "jwt-decode";
import TriviaGame from "./components/TriviaGame";
function App() {
  const [Userid, setUserid] = useState(null);
  const [PriceOfCollect, setPriceOfCollect] = useState(0);
  const [NameOfCollect, setNameOfCollect] = useState("");
  const ValidateUser = () => {
    try {
      let token = sessionStorage.Token;

      if (typeof token === "string") {
        let decoded = jwt_decode(token);
        console.log(decoded)
        setUserid(decoded.sub);
        return Userid;
      } else if (Userid === null) {
        throw new Error("userid log out");
      } else {
        throw new Error("token was undefiend");
      }
    } catch (e) {
      console.log(e.response);
      setUserid(null)
      console.log("userid are logout");
    }
  };
  useEffect(() => {
    ValidateUser();
  }, []);
  return (
    <div>
      <UserinfoContext.Provider
        value={{
          Userid,
          setUserid,
          PriceOfCollect,
          setPriceOfCollect,
          NameOfCollect,
          setNameOfCollect,
        }}
      >
        <Router>
          {/* <div id="navHide">
          <NavBar />
        </div> */}

          <Switch>
            <Route exact={true} path="/">
              <Register />
            </Route>
            <Route path="/upload">
              <UploadFile />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/skin">
              <NavBar />
              {Userid ? <CollectSkinOrder /> : null}
            </Route>
            <Route path="/admin">
              <AdminPagecontroller />
            </Route>
            <Route path="/trivia">
              <TriviaGame />
            </Route>
          </Switch>
        </Router>
      </UserinfoContext.Provider>
    </div>
  );
}

export default App;
