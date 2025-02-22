import { useState, useEffect } from "react";
import "../css/WelcomeModal.css";

function WelcomeModal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>
            Welcome! <span className="hand-wave">✋</span>
          </h2>

          <button className="close-btn" onClick={() => setShow(false)}>
            x
          </button>
        </div>
      </div>
    )
  );
}

export default WelcomeModal;
