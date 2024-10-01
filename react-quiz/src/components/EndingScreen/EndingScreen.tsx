import "./EndingScreen.scss";
import { Action } from "../Main/Main";

interface EndingScreenProps {
  dispatch: (value: Action) => void;
  points: number;
}

const EndingScreen = ({ dispatch, points }: EndingScreenProps) => {
  return (
    <div className="start-screen-container">
      <h1>Quiz has ended</h1>
      <h2>Results: {points} points</h2>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default EndingScreen;
