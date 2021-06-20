import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserinfoContext } from "../Context/SkinOrderContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Login.css";

import jwt_decode from "jwt-decode";
import axios from "axios";
import { Api } from "../Api/Api";
function Login() {
  const [NumberPhone, setNumberPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const { Userid, setUserid } = useContext(UserinfoContext);
  console.log(Userid);

  const history = useHistory();

  const decodeToken = () => {
    let token = sessionStorage.Token;
    let decoded = jwt_decode(token);
    console.log(decoded);
    history.push(`/skin`);
    setUserid(decoded.sub);
  };

  const Authenticated = async (e) => {
    e.preventDefault();
    const PayLoad = {
      NumberPhone: NumberPhone,
      password: Password,
    };
    try {
      const res = await axios.post(`${Api}login`, PayLoad);
      sessionStorage.Token = res.data.token;
      sessionStorage.RefreshToken = res.data.RefreshToken;
      decodeToken();
    } catch (e) {
      console.log(e.response);
      setError(e.response.data);
    }
  };

  return (
    <div>
      <div className="Login">
        <Form onSubmit={Authenticated}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>מספר טלפון</Form.Label>
            <Form.Control
              autoFocus
              type="phone"
              value={NumberPhone}
              onChange={(e) => setNumberPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!Authenticated}>
            התחברות
          </Button>
          <div style={{ color: "red" }}>{Error}</div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
