import React, { useEffect, useState, useContext } from "react";
import { UserinfoContext } from "../Context/SkinOrderContext";

function UploadFile() {
  const [File, setFile] = useState(null);
  const [ImageDetails, setImageDetails] = useState(0);
  const [error, setError] = useState(null);
  const { Userid } = useContext(UserinfoContext);
  console.log(File);
    console.log(ImageDetails.size);
    console.log(ImageDetails.type);

  const UploadFileToServer = (e) => {
    e.preventDefault();
    const PayLoad = {
      img: File,
      size: ImageDetails.size,
      type: ImageDetails.type,
      Userid: Userid,
    };
    fetch("http://localhost:5000/Upload", {
      method: "POST",
      body: JSON.stringify(PayLoad),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={UploadFileToServer}>
        <input
          onChange={(e) => {
            try {
              setImageDetails(e.target.files[0]);
              setFile(URL.createObjectURL(e.target.files[0]));
              setError(null);
            } catch (e) {
              console.error(e);
              setError("בחר קובץ שנית")
            }
          }}
          type="file"
        />
        <button type="submit">העלאה</button>
        <div style={{ color: "red" }}>{error}</div>
      </form>
    </div>
  );
}

export default UploadFile;
