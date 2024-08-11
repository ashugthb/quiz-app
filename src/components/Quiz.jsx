import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length;

  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectedAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  },
  []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="trophy Icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={() => handleSkipAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
