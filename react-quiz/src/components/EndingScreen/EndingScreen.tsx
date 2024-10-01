import "./EndingScreen.scss";
import { Action } from "../Main/Main";

interface EndingScreenProps {
  dispatch: (value: Action) => void;
  points: number;
  totalPoints: number;
}

const EndingScreen = ({ dispatch, points, totalPoints }: EndingScreenProps) => {
  return (
    <div className="start-screen-container">
      <h1>Quiz has ended</h1>
      <h2>
        Results: {points}/{totalPoints} points
      </h2>
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
