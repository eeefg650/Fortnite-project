import React, { useEffect, useState, useContext, useRef } from "react";
import { UserinfoContext } from "../Context/SkinOrderContext";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import Skin from "./AvatarSkin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Api } from "../Api/Api";
function CollectSkinOrder() {
  const [TotalPoints, setTotalPoints] = useState(0);
  const [Success, setSuccess] = useState(null);
  const [Loading, setLoading] = useState(false);
  const {
    Userid,
    setUserid,
    NameOfCollect,
    setNameOfCollect,
    PriceOfCollect,
    setPriceOfCollect,
  } = useContext(UserinfoContext);

  const notify = (err, result) => {
    if (result) {
      toast.success(result, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const decodeToken = () => {
    let token = sessionStorage.Token;
    let decoded = jwt_decode(token);
    console.log(decoded);
    console.log(decoded);
    setUserid(decoded.sub);
    setTotalPoints(decoded.Points);
    setSuccess(false);
  };

  const Number = () => {
    const { number } = useSpring({
      reset: Success,
      from: { number: 0 },
      number: TotalPoints,
      delay: 400,
      // config: config.molasses,
    });
    return <animated.div>{number.to((n) => n.toFixed(1))}</animated.div>;
  };

  const CollectProduct = (GetCollect) => {
    setNameOfCollect(GetCollect);
  };
  const PriceOFProduct = (GetPrice) => {
    setPriceOfCollect(GetPrice);
  };
  const history = useHistory();

  const UpdateToken = async () => {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.RefreshToken,
        "Content-Type": "application/json",
      },
    };
    try {
      const Response = await axios.post(`${Api}refreshtoken`, config, options);
      sessionStorage.Token = Response.data.AccessToken;
      decodeToken();
    } catch (e) {
      console.error(e);
      history.push("/login");
    }
  };

  const PaymentPoints = async () => {
    const PayLoad = {
      NameSkin: NameOfCollect,
      PriceSkin: PriceOfCollect,
      Total: TotalPoints,
      Userid: Userid,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.Token,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${Api}order`, PayLoad, { headers });

      notify(null, res.data.SuccessMsg);
      setLoading(false);
      setSuccess(res.data.success);
    } catch (e) {
      notify(e.response.data.msg);
      console.error(e.message);
    }
  };

  useEffect(() => {
    UpdateToken();
  }, [Success === true]);

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <div
        style={{
          padding: 15,
          marginTop: 20,
          fontFamily: "cursive",
          fontWeight: "bold",
          fontSize: "20px",
          marginRight: 20,
          borderRadius: 15,
          textAlign: "center",
          marginTop: "230px",
          direction: "rtl",
        }}
      >
        סה''כ ויבאקס שצברת : {Number()}
      </div>

      <Skin
        CollectProduct={CollectProduct}
        PriceOFProduct={PriceOFProduct}
        PaymentPoints={PaymentPoints}
      />

      {/* <div style={{ color: "red" }}>
        {Loading ? <div>Loading...</div> : errors}
      </div> */}
    </div>
  );
}

export default CollectSkinOrder;
