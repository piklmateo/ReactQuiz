import { useEffect, useReducer } from "react";
import StartScreen from "../StartScreen/StartScreen";
import { fetchQuestions } from "../../services/questionsService";
import Questions from "../Questions/Questions";
import "./Main.scss";
import EndingScreen from "../EndingScreen/EndingScreen";
import Footer from "../Footer/Footer";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

const initialState = {
  questions: [] as Question[],
  currentQuestionIndex: 0,
  timer: 600,
  status: "start",
  selectedAnswer: null as number | null,
  isCorrect: null as boolean | null,
  points: 0,
};

export type Action =
  | { type: "status"; payload: string }
  | { type: "setQuestions"; payload: Question[] }
  | { type: "nextQuestion" }
  | { type: "chooseAnswer"; payload: { optionId: number; isCorrect: boolean } }
  | { type: "setTimer" }
  | { type: "restart" }
  | { type: "setPoints"; payload: number };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "status":
      return {
        ...state,
        status: action.payload,
      };
    case "setTimer":
      if (state.timer < 1) {
        return {
          ...state,
          status: "end",
        };
      }
      return {
        ...state,
        timer: state.timer - 1,
      };
    case "setQuestions":
      return {
        ...state,
        questions: action.payload,
      };
    case "nextQuestion":
      if (state.currentQuestionIndex >= state.questions.length - 1)
        return state;
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
      };
    case "chooseAnswer":
      return {
        ...state,
        selectedAnswer: action.payload.optionId,
        isCorrect: action.payload.isCorrect,
      };
    case "setPoints": {
      return {
        ...state,
        points: state.points + action.payload,
      };
    }
    case "restart":
      return {
        ...state,
        currentQuestionIndex: 0,
        timer: 600,
        status: "start",
        selectedAnswer: null,
        isCorrect: null,
        points: 0,
      };
    default:
      return state;
  }
};

const Main = () => {
  const [
    {
      questions,
      currentQuestionIndex,
      timer,
      status,
      selectedAnswer,
      isCorrect,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const questions = await fetchQuestions();
      if (questions) {
        dispatch({
          type: "setQuestions",
          payload: questions,
        });
      }
    };
    fetchAndSetQuestions();
  }, [dispatch]);

  const nextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      dispatch({ type: "status", payload: "end" });
    } else {
      dispatch({ type: "nextQuestion" });
    }
  };

  const handleStart = () => {
    dispatch({ type: "status", payload: "ongoing" });
  };

  useEffect(() => {
    let intervalId: number;

    if (status === "ongoing") {
      intervalId = setInterval(() => {
        dispatch({ type: "setTimer" });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const handleChooseAnswer = (optionId: number) => {
    const correctOption = questions[currentQuestionIndex].correctOption;
    const isCorrect = optionId === correctOption;

    if (isCorrect) {
      dispatch({
        type: "setPoints",
        payload: questions[currentQuestionIndex].points,
      });
    }

    dispatch({ type: "chooseAnswer", payload: { optionId, isCorrect } });

    if (currentQuestionIndex === questions.length - 1) {
      dispatch({ type: "status", payload: "end" });
    }
  };

  const totalPoints = questions.reduce(
    (accumulator, question) => accumulator + question.points,
    0
  );

  return (
    <div className="container">
      {status === "start" && <StartScreen onStart={handleStart} />}

      {status === "ongoing" && questions.length > 0 && (
        <>
          <Questions
            questions={questions}
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            onHandleChooseAnswer={handleChooseAnswer}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
          <Footer
            questions={questions}
            nextQuestion={nextQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            timer={timer}
          />
        </>
      )}

      {status === "end" && (
        <EndingScreen
          dispatch={dispatch}
          points={points}
          totalPoints={totalPoints}
        />
      )}
    </div>
  );
};

export default Main;
