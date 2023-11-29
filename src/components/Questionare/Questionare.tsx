import { TutorContext, TutorContextProps } from "../../TutorContext";
import "./Questionare.css"
import React, { useContext, useState } from "react";
import axios from "axios";
import MultipleChoiceForm from "../MultipleChoiceForm/MultipleChoiceForm";

// The purpose of this form is to get the concepts and the student learning 
// preferences. we are building a concept based tutor.

const Questionare: React.FC = () => {

    const { conceptList, updateConceptList } = useContext<TutorContextProps>(TutorContext);
    const { sessionKey } = useContext<TutorContextProps>(TutorContext)

    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [purposeStatement, setPurposeStatement] = useState<string>('')
    const [testingPreference, setTestingPreference] = useState<string>('')
    const [slidesPreference, setSlidesPreference] = useState<string>('')
    const [questionPreference, setQuestionPreference] = useState<string>('')

    // make post request sending all the data back to the tutor
    function submitForm() {
        // send post request with all the data from the questionare
        // before adding new message check size.
        function sendData() {// URL to which you want to send the POST request

            console.log("Sending questionare data...")
            const url = 'http://127.0.0.1:8000/'; //change to actual API URL.

            // Data to be sent in the request body
            const data = {
                "session_key": sessionKey,
                "concept_list": conceptList,
                "purpose_statement": purposeStatement,
                "question_number": questionNumber,
                "testing_preference": testingPreference,
                "slides_preference": slidesPreference,
                "question_preference": questionPreference
            }
            console.log(data);

            // Sending the POST request using axios
            axios.post(url, data)
                .then(response => {
                    // Handle the successful response
                    console.log('Status Code:', response.status);
                    console.log('Response Data:', response.data);

                })
                .catch(error => {
                    // Handle errors
                    console.error('Something happen while POST request\nError:', error);
                });
        }
        sendData();
        console.log("Submited")
    }

    function removeConcept(index: number) {
        const newConcepts = [...conceptList];
        newConcepts.splice(index, 1);
        updateConceptList(newConcepts);
    }

    return (
        <div className="questionare-container">
            <h1>Questionare</h1>
            <p> Welcome to Concept Based Learning. Students learn based on Concepts. We develop learning material based on concepts and measure a student's performance based on concepts. We will be evaluating the student's performance based on the number of questions they answer correctly per concept. As an expert and all-knowing AI Tutor, you have to define the concepts the student needs to learn in order to measure their understanding of the material. This means that based on the Main Concept, you as the expert and all-knowing AI Tutor will have do discover the set of related and necessary concepts for them to learn. This should be done during the planning phase. This is a crucial step in our learning process.</p>


            <div className="question-container">
                <h2>Concept List</h2>
                <div className="concept-list-container">
                    {conceptList.length > 0 ? (
                        conceptList.map((concept: string, index: number) => (
                            <p className="concept-box" key={index}> {concept} <a onClick={() => removeConcept(index)}> (x)</a></p>
                        ))
                    ) : (
                        <strong>There are no concepts, sorry.</strong>
                    )}
                </div>

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
                <h2>Purpose Statement</h2>
                <p>Can you tell me more about yourself and what kinds of things you like to do or find interesting? We will use this to connect language and ideas to things you're interested in when I teach you later:</p>
                <textarea value={purposeStatement} onChange={(e) => { setPurposeStatement(e.target.value) }} placeholder="example: I love sports and history"></textarea>
            </div>


            <div className="question-container">
                <h2>Testing Preferences</h2>
                <MultipleChoiceForm
                    question="What kind of style do you want to be quizzed on?"
                    options={['Option1', 'Option2', 'Option3', 'Option4']}
                    setState={setTestingPreference}
                />
            </div>


            <div className="question-container">
                <h2>Slides Preferences</h2>
                <MultipleChoiceForm
                    question="What kind of slides would like to generate?"
                    options={['Introductory', 'Related/Comparison', 'Exploratory', 'Explanatory (reiteration)', 'Example slides']}
                    setState={setSlidesPreference}
                />
            </div>


            <div className="question-container">
                <h2>Questions Preferences</h2>
                <MultipleChoiceForm
                    question="What types of questions would you like?"
                    options={['Short Response', 'Multiple Choice', 'Math write output', 'Test Based Coding Questions']}
                    setState={setQuestionPreference}
                />
            </div>


            <a className="questionare-submit" onClick={submitForm}>Send</a>
        </div>


    );
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
