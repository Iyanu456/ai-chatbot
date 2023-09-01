import React, { useState, useEffect } from "react";

const TestFlash = ({ content, startTimer }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (startTimer) {
      setVisible(true);

      timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [startTimer]);

  if (!visible) {
    return null;
  }

  return (
    <div className="timed-component">
      {content}
    </div>
  );
};

export default TestFlash;
