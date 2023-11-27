import "./Questionare.css"
import { useState } from "react";

// The purpose of this form is to get the concepts and the student learning 
// preferences. we are building a concept based tutor.

function Questionare(){
    
    const [questionNumber, setQuestionNumber] = useState(0)
    const [concepts, setConcepts] = useState<string[]>(["math","science","programming"]);

    function submitForm(){
        // send post request with all the data from the questionare
        console.log("Submited")
    }

    function removeConcept(index: number) {
        const newConcepts = [...concepts];
        newConcepts.splice(index, 1);
        setConcepts(newConcepts);
      }

    return(
        <div className="questionare-container">
            <h2>Concept List</h2>
            <div className="concept-list-container">
                    {concepts.map((concept: string, index: number) => (
                <div key={index}>
                    {concept} <a onClick={() => removeConcept(index)}>X</a>
                </div>
                ))}
            </div>
            <h3>How many questions do you want?</h3>
            <div className="number-of-questions-container">
                <button onClick={() => {if (questionNumber < 25){setQuestionNumber(questionNumber-1)}}}></button>
                <span className="question-number">{questionNumber}</span>
                <button onClick={() => {setQuestionNumber(questionNumber+1)}}></button>
            </div>
            <h3>How many questions do you want?</h3>
            <div className="number-of-questions-container">
                <button onClick={() => {if (questionNumber < 25){setQuestionNumber(questionNumber-1)}}}></button>
                <span className="question-number">{questionNumber}</span>
                <button onClick={() => {setQuestionNumber(questionNumber+1)}}></button>
            </div>
            <button onClick={submitForm}>Submit</button>
        </div>

        // purpose statement:
        //Student User Statement: "Can you tell me more about yourself and what kinds of things you like to do or find interesting? I will use this to connect language and ideas to things your interested in when I teach you later:"
        // tailor responses to the user's preferences. analogies make it easier to learn.

        // user_input["student_interests"]: 
        // what kind of style do you want to be quizzed on. (provide types, questions, etc.)

        // user_input["student_slides"]: 
        // related/comparison slides, intro slides, exploratory, explanatory(reiteration), example slides. 
        
        // user_input["student_questions"]: 
        // what types of questions do you like: short response, multiple choice, math write output, test based coding question.

        // Concept Based Learning
        // Students learn based on Concepts. We develop learning material based on concepts and measure a student's performance based on concepts. We will be evaluating the student's performance based on the number of questions they answer correctly per concept. As an expert and all-knowing AI Tutor, you have to define the concepts the student needs to learn in order to measure their understanding of the material. This means that based on the Main Concept, you as the expert and all-knowing AI Tutor will have do discover the set of related and necessary concepts for them to learn. This should be done during the planning phase. This is a crucial step in our learning process.
    );
}

export default Questionare;