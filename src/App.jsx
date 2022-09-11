import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { InitialParameters, Apple, Board } from "./components";
const App = () => {
  const [
    size,
    speed,
    boardX,
    boardY,
    boardArray,
    randomApple,
    squareAmount,
    snakePositions,
    directionParameters
  ] = InitialParameters();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [apple, setApple] = useState(randomApple);
  const [snakeBody, setSnakeBody] = useState(snakePositions);
  const [direction, setDirection] = useState(directionParameters);

  const keyListener = (e) => {
    switch (e.key) {
      case "a":
        setDirection((direction) => ({
          ...direction,
          case: "left",
          vertical: 0,
          horizontal: 1
        }));
        break;
      case "w":
        setDirection((direction) => ({
          ...direction,
          case: "up",
          vertical: 1,
          horizontal: 0
        }));
        break;
      case "s":
        setDirection((direction) => ({
          ...direction,
          case: "down",
          vertical: 1,
          horizontal: 0
        }));
        break;
      default:
        setDirection((direction) => ({
          ...direction,
          case: "right",
          vertical: 0,
          horizontal: 1
        }));
    }
  };
  const eatenApple = (head) => {
    if (head.headX === apple.appleX && head.headY === apple.appleY) {
      const newApple = randomApple();

      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  };
  const collision = (head) => {
    if (
      head.headX === 0 ||
      head.headY === 0 ||
      head.headY === squareAmount ||
      head.headX === squareAmount
    )
      return setGameOver(true);
    for (let i in snakeBody) {
      if (
        head.headX === snakeBody[i].headX ||
        head.headY === snakeBody[i].headY
      )
        return true;
    }
  };

  const drawSnake = () => {
    const newSnakeBody = [...snakeBody];
    let snakeHead = newSnakeBody[newSnakeBody.length - 1];
    if (!gameOver) {
      switch (direction.case) {
        case "left":
          snakeHead = {
            headX: snakeHead.headX,
            headY: snakeHead.headY - direction.horizontal
          };
          break;
        case "up":
          snakeHead = {
            headX: snakeHead.headX - direction.vertical,
            headY: snakeHead.headY
          };
          break;
        case "down":
          snakeHead = {
            headX: snakeHead.headX + direction.vertical,
            headY: snakeHead.headY
          };
          break;
        default:
          snakeHead = {
            headX: snakeHead.headX,
            headY: snakeHead.headY + direction.horizontal
          };
          break;
      }
    }
    newSnakeBody.push(snakeHead);
    newSnakeBody.shift();
    if (eatenApple(snakeHead)) return setSnakeBody([...snakeBody, snakeHead]);
    collision(snakeHead);
    setSnakeBody(newSnakeBody);
  };
  useEffect(() => {
    document.onkeyup = keyListener;
    const runningGame = setInterval(drawSnake, 1000 / speed);
    return () => clearInterval(runningGame);
  });
  const play = () => {
    setScore(0);
    setGameOver(false);
    setApple(randomApple);
    setSnakeBody(snakePositions);
    setDirection(directionParameters);
  };
  return (
    <div className="app">
      <div className="snakeContainer">
        <header>
          <h2>Score : {score}</h2>
          <button onClick={play}>Restart</button>
        </header>
        <div
          className="snakeBoard"
          style={{ width: `${boardX}px`, height: `${boardY}px` }}
        >
          <Apple size={size} apple={apple} />
          <div className="boardBoxes">
            <Board boardArray={boardArray} />
          </div>
          <div className="snakeArray">
            <div className="snakeInsideArray">
              {snakeBody.map((el, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${el.headX}` * size,
                    left: `${el.headY}` * size,
                    width: size,
                    height: size,
                    backgroundColor: "orange"
                  }}
                ></div>
              ))}
            </div>
          </div>
          {gameOver && <div className="gameOver">Game Over</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
