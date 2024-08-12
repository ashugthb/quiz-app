import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  let activeQuestionIndex = userAnswer.length;
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleFlip = () => {
    setFlipped((prevState) => !prevState);
  };

  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectedAnswer(
    selectedAnswer
  ) {
    setTimeout(() => {
      setUserAnswer((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });
      setFlipped((prevState) => !prevState);
    }, 3000);
    setFlipped((prevState) => !prevState);

    setSelectedAnswer("");
  },
  []);

  console.log(userAnswer);
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
    <div className={`flip-card ${flipped ? "flipped" : ""}`}>
      <div id="quiz" className="flip-card-inner">
        <div id="question" className="flip-card-front">
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={100000}
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
        <div className="flip-card-back">
          <h2>Question : {QUESTIONS[activeQuestionIndex].text}</h2>
          <h2>ANSWER</h2>
          <li> {QUESTIONS[activeQuestionIndex].answers[1]}</li>
        </div>
      </div>
    </div>
  );
}
