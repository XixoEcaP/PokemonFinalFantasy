import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMessage } from "../store/gameSlice";

export default function useMessageManager() {
  const dispatch = useDispatch();
  const { keyHandler, message } = useSelector((state) => state.game);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        keyHandler === "MessageKeyboardHandler" &&
        e.key.toLowerCase() === "x"
      ) {
        dispatch(nextMessage()); // ✅ Move to next message or exit
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, keyHandler]);

  return message; // ✅ Returns the current message to display
}
