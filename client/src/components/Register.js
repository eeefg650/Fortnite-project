import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Login.css";
import axios from "axios";
import { Api } from "../Api/Api";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [FirstName, setFirstName] = useState("");
  const [NumberPhone, setNumberPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [Errors, setErrors] = useState("");
  const [SuccessRegister, setSuccessRegister] = useState("");
  const history = useHistory();

  const SubmitForm = async (e) => {
    e.preventDefault();
    const PayLoad = {
      FirstName: FirstName,
      NumberPhone: NumberPhone,
      password: Password,
      password2: Password2,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(`${Api}signup`, PayLoad, { headers });
      setSuccessRegister(res.data.msg);
      history.push("/login")
    } catch (e) {
      console.log(e.response);
      setErrors(e.response.data);
    }
  };

  return (
    <div>
      <div className="Login">
        <Form onSubmit={SubmitForm}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>מספר טלפון</Form.Label>
            <Form.Control
              type="number"
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
          <Form.Group size="lg" controlId="password">
            <Form.Label>אימות סיסמא</Form.Label>
            <Form.Control
              type="password"
              value={Password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!SubmitForm}>
            הירשם
          </Button>
          <div style={{ color: "red" }}>{Error}</div>
        </Form>
      </div>
      <div>
        {Errors &&
          Errors.map((error, index) => {
            return (
              <div key={index} style={{ color: "red", textAlign: "center" }}>
                {error.msg}
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "center", fontWeight: "bold", color: "green" }}>
        {SuccessRegister}
      </div>
    </div>
  );
}
