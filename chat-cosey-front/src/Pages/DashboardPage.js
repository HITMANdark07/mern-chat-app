import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const nameRef = React.useRef();
  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " +localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        makeToast("success","Got Rooms Hurray");
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };
  const createChatroom = () => {
    axios
      .post("http://localhost:8000/chatroom",
      {
        name:nameRef.current.value
      },
      {
        headers: {
          Authorization: "Bearer " +localStorage.getItem("CC_Token"),
        },
      },
      )
    .then((response) => {
      makeToast("success", response.data.message);
    })
    .catch((err) => {
      makeToast("error", err)
    });
  }

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
            ref={nameRef}
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
