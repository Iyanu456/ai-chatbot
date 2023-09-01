import React, { useState, useEffect } from "react";
import "./styles/FlashNotification.css";

const FlashNotification = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`flash-notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default FlashNotification;
