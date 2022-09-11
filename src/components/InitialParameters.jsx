export const InitialParameters = () => {
  const size = 25;
  const speed = 15;
  const boardX = 800;
  const boardY = boardX;
  const squareAmount = boardX / size;
  const boardArray = new Array(squareAmount).fill(
    new Array(squareAmount).fill("")
  );
  const snakePositions = [
    {
      headY: 4,
      headX: 14
    },
    {
      headY: 4,
      headX: 15
    }
  ];
  const directionParameters = {
    vertical: 0,
    horizontal: 1,
    case: "right"
  };
  const randomApple = () => {
    return {
      appleX: Math.floor(Math.random() * squareAmount),
      appleY: Math.floor(Math.random() * squareAmount)
    };
  };
  return [
    size,
    speed,
    boardX,
    boardY,
    boardArray,
    randomApple,
    squareAmount,
    snakePositions,
    directionParameters
  ];
};
