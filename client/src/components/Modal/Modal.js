import React, { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import { UserinfoContext } from "../../Context/SkinOrderContext";

import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalSkin(props) {
  const { PaymentPoints, isOpen, hideModal } = props;
  const { PriceOfCollect } = useContext(UserinfoContext);
  const { NameOfCollect } = useContext(UserinfoContext);

  return (
    <div>
      <Modal show={isOpen} onHide={isOpen}>
        <Modal.Header>
          <Modal.Title>?האם אתה בטוח שברצונך לקנות סקין זה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ direction: "rtl", textAlign: "center" }}>
            <li>
              <div>הסקין שבחרת : {NameOfCollect}</div>
            </li>
            <li>
              <div>מחיר הסקין : {PriceOfCollect} ויבאקס</div>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className="buttonModal" onClick={hideModal}>
            ביטול
          </button>
          <button
            className="buttonModal"
            onClick={() => {
              PaymentPoints();
              hideModal();
            }}
          >
            בצע קנייה
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
