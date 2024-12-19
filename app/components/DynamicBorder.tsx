"use client";

import React, { useEffect, useState } from "react";

interface DynamicBorderCardProps {
  endDate: Date;
  children: React.ReactNode;
}

const DynamicBorderCard: React.FC<DynamicBorderCardProps> = ({
  endDate,
  children,
}) => {
  const [borderColor, setBorderColor] = useState<string>("green");

  useEffect(() => {
    const updateBorderColor = () => {
      const now = new Date();
      const timeDiff = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (timeDiff <= 24) {
        setBorderColor("red");
      } else if (timeDiff <= 72) {
        setBorderColor("yellow");
      } else if (timeDiff <= 120) {
        setBorderColor("green");
      } else {
        setBorderColor("transparent");
      }
    };

    updateBorderColor();

    const interval = setInterval(updateBorderColor, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div
      style={{
        border: `4px solid ${borderColor}`,
        borderRadius: "8px",
        transition: "border-color 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

export default DynamicBorderCard;
