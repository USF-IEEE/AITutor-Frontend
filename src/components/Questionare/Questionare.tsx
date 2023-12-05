import { TutorContext, TutorContextProps } from "../../TutorContext";
import "./Questionare.css"
import React, { useContext, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

// The purpose of this form is to get the concepts and the student learning 
// preferences. we are building a concept based tutor.

const Questionare: React.FC = () => {

    const { updateSlides } = useContext<TutorContextProps>(TutorContext)

    const { conceptList, updateConceptList } = useContext<TutorContextProps>(TutorContext);
    const { sessionKey } = useContext<TutorContextProps>(TutorContext)

    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [studentInterest, setStudentInterest] = useState<string>('')
    const [testingPreference, setTestingPreference] = useState<string>('')
    const [slidesPreference, setSlidesPreference] = useState<string>('')
    const [questionPreference, setQuestionPreference] = useState<string>('')

    const [newConcept, setNewConcept] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // make post request sending all the data back to the tutor
    const submitForm = async () => {
        setIsLoading(true);
        const url = 'http://127.0.0.1:8000/session/'; // Change to actual API URL.
    
        const data = {
            user_prompt: "", // Ensure this is the intended value
            session_key: sessionKey,
            list_concepts: conceptList,
            student_interests: studentInterest,
            num_questions: questionNumber,
            testing_preference: testingPreference,
            student_slides: slidesPreference,
            student_questions: questionPreference
        };
    
        try {
            const response = await axios.post(url, data);
    
            if (response.data && response.data.response && response.data.response.teaching && response.data.response.teaching.slides) {
                updateSlides(response.data.response.teaching.slides);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    function removeConcept(index: number) {
        const newConcepts = [...conceptList];
        newConcepts.splice(index, 1);
        updateConceptList(newConcepts);
    }

    function addConcept(newConcept: string) {
        updateConceptList([...conceptList, newConcept]);
    }


    if (isLoading) {
        return (<LoadingScreen />)
    }
    else {
        return (<div className="questionare-container">
            <h1>Questionare</h1>
            <p> Welcome to Concept Based Learning. Students learn based on Concepts. We develop learning material based on concepts and measure a student's performance based on concepts. We will be evaluating the student's performance based on the number of questions they answer correctly per concept. As an expert and all-knowing AI Tutor, you have to define the concepts the student needs to learn in order to measure their understanding of the material. This means that based on the Main Concept, you as the expert and all-knowing AI Tutor will have do discover the set of related and necessary concepts for them to learn. This should be done during the planning phase. This is a crucial step in our learning process.</p>


            <div className="question-container">
                <h2>Concept List</h2>
                <p>Remove the concepts you wish to NOT be quizzed on or learn about</p>
                <div className="concept-list-container">
                    {conceptList.length > 0 ? (
                        conceptList.map((concept: string, index: number) => (
                            <p className="concept-box" key={index}> {concept} <a onClick={() => removeConcept(index)}> (x)</a></p>
                        ))
                    ) : (
                        <strong>There are no concepts, sorry.</strong>
                    )}
                </div>

                <input type="text" value={newConcept} onChange={(e) => { (setNewConcept(e.target.value)) }} placeholder="add a concept" />
                <button onClick={() => { addConcept(newConcept); setNewConcept('') }}>Add</button>

            </div>



            <div className="question-container">
                <h2>How many questions do you want?</h2>
                <div className="number-of-questions-container">
                    <button onClick={() => { if (questionNumber > 0) { setQuestionNumber(questionNumber - 1) } }}> - </button>
                    <span className="question-number">{questionNumber}</span>
                    <button onClick={() => { if (questionNumber < 25) { setQuestionNumber(questionNumber + 1) } }}> + </button>
                </div>
            </div>

            <div className="question-container">
                <h2>Student Interests</h2>
                <p>Tell us more about yourself and what kinds of things you like to do or find interesting? We will use this to connect language and ideas to things you're interested in when I teach you later:</p>
                <textarea value={studentInterest} onChange={(e) => { setStudentInterest(e.target.value) }} placeholder="example: I love sports and history"></textarea>
            </div>

            <div className="question-container">
                <h2>Testing Preferences</h2>
                <p>What types of questions do you want?</p>
                <textarea value={testingPreference} onChange={(e) => { setTestingPreference(e.target.value) }} placeholder="example: conceptual, coding, math, literature"></textarea>
            </div>

            <div className="question-container">
                <h2>Questions Preferences</h2>
                <p>What types of questions would you prefer?</p>
                <textarea value={questionPreference} onChange={(e) => { setQuestionPreference(e.target.value) }} placeholder="example: multiple choice, short question, testing code, math solution"></textarea>
            </div>

            <div className="question-container">
                <h2>Slides Preferences</h2>
                <p>What type of slides would you like to generate?</p>
                <textarea value={slidesPreference} onChange={(e) => { setSlidesPreference(e.target.value) }} placeholder="example: introductory, example, "></textarea>
            </div>
            <a className="questionare-submit" onClick={submitForm}>Send</a>
        </div>
        )
    }


}

export default Questionare;


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
