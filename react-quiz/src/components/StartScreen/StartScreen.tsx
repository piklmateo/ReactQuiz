import "./StartScreen.scss";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="start-screen-container">
      <h1>Welcome to the react quiz</h1>
      <h2>15 questions to test your React.js knowledge</h2>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
