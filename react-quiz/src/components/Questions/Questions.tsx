import Footer from "../Footer/Footer";
import { Question } from "../Main/Main";
import "./Questions.scss";

interface QuestionsProps {
  questions: Question[];
  question: Question;
  currentQuestionIndex: number;
  onHandleChooseAnswer: (optionId: number) => void;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  timer: number;
  nextQuestion: () => void;
}

const Questions = ({
  questions,
  question,
  currentQuestionIndex,
  onHandleChooseAnswer,
  isCorrect,
  selectedAnswer,
  timer,
  nextQuestion,
}: QuestionsProps) => {
  return (
    <div className="questions-container">
      <h3 className="question-text">
        {currentQuestionIndex +
          1 +
          "/" +
          questions.length +
          " " +
          "- " +
          question.question}
      </h3>
      {question.options.map((option, index) => (
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
      ))}
      <Footer
        questions={questions}
        nextQuestion={nextQuestion}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswer={selectedAnswer}
        timer={timer}
      />
    </div>
  );
};

export default Questions;
