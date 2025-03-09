import React from "react";
import { useSelector } from "react-redux";
import battleBoxSrc from "../assets/messagebox.png";

const MessageBox = () => {
  const message = useSelector((state) => state.game.message); // ✅ Get current message

  if (!message) return null; // ✅ Hide box if no message

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "0px", // ✅ Sticks to bottom
          left: "0px",
          width: "512px", // ✅ Keeps original PNG width
          height: "96px", // ✅ Keeps original PNG height
          background: `url(${battleBoxSrc}) no-repeat center/contain`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "white",
          fontSize: "16px",

          // fontFamily: '"Times New Roman", Times, serif',
          //fontFamily: "Final Fantasy, sans-serif",
          textAlign: "left",
          lineHeight: "1.5",
        }}
      >
        <span style={{ marginLeft: "20px" }}>{message}</span>{" "}
        {/* ✅ Moves text right */}
      </div>
    </>
  );
};

export default MessageBox;
