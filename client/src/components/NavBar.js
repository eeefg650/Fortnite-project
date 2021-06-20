import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserinfoContext } from "../Context/SkinOrderContext";
import UserNotLogin from "./Modal/userNotLogin";

function NavBar() {
  const { Userid } = useContext(UserinfoContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  console.log(Userid);
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const history = useHistory();

  return (
    <div className="header-outs" id="home">
      <div>
        <UserNotLogin hideModal={hideModal} isOpen={isOpen} />
      </div>
      <div className="header-w3layouts">
        <div className="container">
          <div className="right-side">
            <p>
              <button id="trigger-overlay" type="button">
                <span className="fa fa-bars" aria-hidden="true" />
              </button>
            </p>
          </div>
          {/* open/close */}
          <div className="overlay overlay-hugeinc">
            <button type="button" className="overlay-close">
              Close
            </button>
            <nav>
              <ul>
                )
                <li>
                  <a href="/">הירשם</a>
                </li>
                <li>
                  <a href="/login">התחבר</a>
                </li>
                {Userid ? (
                  <li>
                    <a href="/skin">קניית סקין</a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>

          {/* /open/close */}
          {/* /navigation section */}
        </div>
        <div className="clearfix"> </div>
      </div>
      {/*banner*/}
      <div className="slides text-center">
        <div className="slide slide--current one-img ">
          <div className="slider-up">
            <h4>Fortnite</h4>
            <h5>
              Fort
              <span className="fab fa-d-and-d" />
              Nite
            </h5>
            <div className="outs_more-buttn">
              <Link
                onClick={() => {
                  !Userid ? showModal() : history.push("/trivia");
                }}
              >
                צבור נקודות עכשיו
              </Link>
            </div>
          </div>
          <div className="slide__img"></div>
        </div>

        <div className="clearfix" />
      </div>
      <div className="clearfix" />
    </div>
  );
}

export default NavBar;
