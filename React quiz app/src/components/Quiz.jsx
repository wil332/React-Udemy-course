import { useState,useCallback } from "react";

import QUESTIONS from '../question';

import quizCompleteImg from '../assets/quiz-complete.png'

import Question from "./Question";

export default function Quiz(){
    const [answerState, setAnswerState] = useState('')
    const [ userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length-1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    if(quizIsComplete){
        return <div id="summary">
            <img src={quizCompleteImg} alt="quiz complete img" />
            <h2>Quiz Completed!</h2>
        </div>
    }

const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    setAnswerState('answered');
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });
        setTimeout(()=>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong')
            }
            setTimeout(()=>{
                setAnswerState('');
            },2000)
        },1000)
    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])

    return (<div id="quiz">

    <Question questionText = {QUESTIONS[activeQuestionIndex].text} answers = {QUESTIONS[activeQuestionIndex].answers} onSelectAnswer={handleSelectAnswer} selectedAnswer = {userAnswers[userAnswers.length-1]} answerState={answerState} onSkipAnswer={handleSkipAnswer} key={activeQuestionIndex}/>
    </div>
)};