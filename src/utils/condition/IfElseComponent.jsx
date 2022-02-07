import React from "react";

export const If = ({ condition, children }) => {
  if (condition) return <div>{children}</div>;
  return null;
};

export const IfElse = ({ condition, children, children2 }) => {
  if (condition) {
    return <div>{children}</div>;
  } else {
    return children2;
  }
};
