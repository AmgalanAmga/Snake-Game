import React from "react";

export const Board = ({ boardArray }) => {
  return (
    <>
      {boardArray.map((row, i) => (
        <div className="boardRow" key={i}>
          {row.map((col, j) => (
            <div
              key={j}
              className="boardBox"
              style={
                (i + j) % 2
                  ? { backgroundColor: "#202937" }
                  : { backgroundColor: "#263445" }
              }
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};
