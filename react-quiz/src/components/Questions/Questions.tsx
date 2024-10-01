import { Question } from "../Main/Main";
import "./Questions.scss";

interface QuestionsProps {
  question: Question;
  onHandleChooseAnswer: (optionId: number) => void;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

const Questions = ({
  question,
  onHandleChooseAnswer,
  isCorrect,
  selectedAnswer,
}: QuestionsProps) => {
  return (
    <div className="questions-container">
      <h3 key={question.question}>{question.question}</h3>
      {question.options.map((option, index) => (
        <>
          <button
            key={index}
            className={`btn btn-option ${
              selectedAnswer === index
                ? isCorrect
                  ? "correct-option"
                  : "wrong-option"
                : ""
            }`}
            onClick={() => onHandleChooseAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        </>
      ))}
    </div>
  );
};

export default Questions;
