import React, { useState, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserinfoContext } from "../../Context/SkinOrderContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const UserNotLogin = (props) => {
  const { hideModal, isOpen } = props;
  const { Userid } = useContext(UserinfoContext);

  return (
    <div>
        <Modal show={isOpen} onHide={isOpen}>
          <Modal.Header>
            <Modal.Title>אופס אתה לא מחובר</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul style={{ direction: "rtl", textAlign: "center" }}>
              <li>
                <div>המערכת מזהה שאתה לא מחובר</div>
              </li>
              <li>
                <div>קודם עליך להתחבר ואז להמשיך</div>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button className="buttonModal" onClick={hideModal}>ביטול</button>
            <a className="buttonModal" href="/login">התחבר</a>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default UserNotLogin;
