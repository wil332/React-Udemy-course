import { useState,useCallback } from "react";

import QUESTIONS from '../question';

import quizCompleteImg from '../assets/quiz-complete.png'

import Question from "./Question";

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

const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });
       
    },[]);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])

    return (<div id="quiz">

    <Question onSelectAnswer={handleSelectAnswer}  onSkipAnswer={handleSkipAnswer} key={activeQuestionIndex} index={activeQuestionIndex}/>
    </div>
)};