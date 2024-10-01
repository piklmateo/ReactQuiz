import { formatTimer } from "../../helpers/GlobalFunctions";
import { Question } from "../Main/Main";

interface FooterProps {
  questions: Question[];
  nextQuestion: () => void;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timer: number;
}

const Footer = ({
  questions,
  nextQuestion,
  currentQuestionIndex,
  selectedAnswer,
  timer,
}: FooterProps) => {
  return (
    <div className="question-navigation">
      <button className="btn btn-ui">{formatTimer(timer)}</button>

      <button
        className="btn btn-ui"
        onClick={nextQuestion}
        disabled={
          currentQuestionIndex === questions.length - 1 ||
          selectedAnswer === null
        }
      >
        Next
      </button>
    </div>
  );
};

export default Footer;
