import React, { useState, useEffect } from "react";
import "../../css/AdminPage.css";

function AdminPagecontroller() {
  const [GetAllUsers, setGetAllUsers] = useState([]);
  const [UpdatePoints, setUpdatePoints] = useState(0);
  const [Userid, setUserid] = useState("");
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [SuccessDelete, setSuccessDelete] = useState(false);

  const ChangePoints = (e) => {
    e.preventDefault();

    console.log(Userid);
    const Payload = {
      Points: Number(UpdatePoints),
      Userid: Userid,
    };
    setLoading(true);
    fetch("http://localhost:5000/updatePoints", {
      method: "PUT",
      body: JSON.stringify(Payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setMessage(res.msg);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const DeleteUser = (id) => {
    const payload = {
      Userid: id,
    };
    setLoading(true);
    fetch("http://localhost:5000/DeleteUser", {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setMessage(res.msg);
        setLoading(false);
        setSuccessDelete(res.success);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const GetUsers = () => {
    fetch("http://localhost:5000/GetUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((docs) => {
        console.log(docs);
        setGetAllUsers(docs);
        setSuccessDelete(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    GetUsers();
  }, []);

  useEffect(() => {
    GetUsers();
  }, [SuccessDelete === true]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexFlow: "wrap",
          gap: "190px",
          justifyContent: "center",
          fontWeight: "bold",
          direction: "rtl",
        }}
      >
        {GetAllUsers.map((users, index) => {
          return (
            <div key={index}>
              <div>{GetAllUsers.indexOf(users)}</div>
              <form onSubmit={ChangePoints}>
                <p>שם הלקוח :</p>
                <div>{users.FirstName}</div>
                <p>מס' טלפון :</p>
                <div>{users.NumberPhone}</div>
                <p>כמות ויבאקס שנצברו :</p>

                <textarea
                  onChange={(e) => {
                    setUpdatePoints(e.target.value);
                    setUserid(users._id);
                  }}
                >
                  {users.Points}
                </textarea>
                <button type="submit">אישור</button>
                <button
                  onClick={() => {
                    DeleteUser(users._id);
                  }}
                  className="delete"
                >
                  מחיקה
                </button>
              </form>

              <img src={users.img} width="150px" />
            </div>
          );
        })}
        <div style={{textAlign: "center"}}>{Loading ? <div>Loading...</div> : Message}</div>
      </div>
    </div>
  );
}
export default AdminPagecontroller;
