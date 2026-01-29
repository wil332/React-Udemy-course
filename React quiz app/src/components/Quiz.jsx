import { useState,useCallback } from "react";

import QUESTIONS from '../question';

import quizCompleteImg from '../assets/quiz-complete.png'

import QuestionTimer from "./QuestionTimer";

export default function Quiz(){
    const [ userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    if(quizIsComplete){
        return <div id="summary">
            <img src={quizCompleteImg} alt="quiz complete img" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(()=>Math.random()-0.5);

const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });
    },[]);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])

    return (<div id="quiz">

    <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
         <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
         <ul id="answers">
            {shuffledAnswers.map((answer)=>(
                <li key={answer} className="answer">
                    <button onClick = {()=>handleSelectAnswer(answer)}>{answer}</button>
                </li>
            ))}
         </ul>
    </div>
    </div>
)};