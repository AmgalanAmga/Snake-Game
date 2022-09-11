import fruit from "../apple.png";
export const Apple = ({ size, apple }) => {
  return (
    <img
      src={fruit}
      className="apple"
      alt=""
      width={size}
      style={{
        position: "absolute",
        top: `${apple.appleX}` * size,
        left: `${apple.appleY}` * size
      }}
    />
  );
};
