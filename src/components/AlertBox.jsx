import { useState } from "react";
import "./AlertBox.css";

export default function AlertBox({ children, onClose }) {
  const [alert, setAlert] = useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }

    setAlert(false);
  };
  return (
    <>
      {alert && (
        <div className="alert-box">
          <p>{children}</p>
          <button onClick={handleClose}>Ok</button>
        </div>
      )}
    </>
  );
}
