import React, { useEffect, useState, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ModalSkin from "./Modal/Modal";
const Skin = (props) => {
  const { CollectProduct, PriceOFProduct, PaymentPoints } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/*//banner */}
      {/*Avatar */}

      <div>
        <ModalSkin
          PaymentPoints={PaymentPoints}
          isOpen={isOpen}
          hideModal={hideModal}
        />
      </div>
      <section className="select-hero py-lg-4 py-md-3 py-sm-3 py-3">
        <div className="container py-lg-5 py-md-5 py-sm-4 py-4">
          <h3 className="title text-center mb-lg-5 mb-md-4 mb-sm-4 mb-3">
            Buy Weapon
          </h3>
          <div className="state-us">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at1.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-upload" />
                    <h4>Price Skin</h4>
                    <h2>320</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Simple Shootgun");
                      PriceOFProduct(320);
                      showModal();
                    }}
                  />
                </figure>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at2.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-upload" />
                    <h4>Price Skin</h4>
                    <h2>400</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Royale Firearm Weapon");
                      PriceOFProduct(400);
                      showModal();
                    }}
                  />
                </figure>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at3.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-upload" />
                    <h4>Price Skin</h4>
                    <h2>500</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Royale Pulsar Weapon");
                      PriceOFProduct(500);
                      showModal();
                    }}
                  />
                </figure>
              </div>
            </div>
            <div className="row mt-lg-5 mt-md-3 mt-3">
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at4.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-upload" />
                    <h4>Price Skin</h4>
                    <h2>700</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Royale FN SCAR Weapon");
                      PriceOFProduct(700);
                      showModal();
                    }}
                  />
                </figure>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at5.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-upload" />
                    <h4>Price Skin</h4>
                    <h2>1200</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Royale Shotgun Helium");
                      PriceOFProduct(1200);
                      showModal();
                    }}
                  />
                </figure>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 latest-jewel-grid">
                <figure className="snip1321">
                  <img src="images/at6.png" className="img-thumbnail" alt />
                  <figcaption>
                    <i className="ion-share" />
                    <h4>Price Skin</h4>
                    <h2>1500</h2>
                  </figcaption>

                  <a
                    onClick={() => {
                      CollectProduct("Sniper Rifle Weapon");
                      PriceOFProduct(1500);
                      showModal();
                    }}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skin;
