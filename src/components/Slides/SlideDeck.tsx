import React, { useContext, useState } from "react";
import Slide from "./Slide";
import "./Slides.css"
import axios from "axios";
import { TutorContext, TutorContextProps } from "../../TutorContext";
import { useChatContext } from '../ChatContext/ChatContext';

const SlideDeck: React.FC = () => {

    const {
        currentState,
        updateCurrentState,
        sessionKey,
        updateSessionKey,
        updateConceptList,
        updatePromptType,
        slides,
        updateSlides,
        currentObjIdx,
        updateCurrentObjIdx,
        setMakeRequest
    } = useContext<TutorContextProps>(TutorContext);

    const [slideIndex, setSlideIndex] = useState(0); // set to first slide
    const { addNewMessage } = useChatContext();
    
    const openaiApiKey = "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"; //TODO: change this
    const synthesizeSpeech =  async (text:string) => {
        console.log("auidioing?")

      try {
        const response =  await axios.post(
          'https://api.openai.com/v1/audio/speech',
          { input: text, voice: "echo", model:"tts-1"
        },
          {
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json',
            },
            responseType: 'blob' // Expect a binary response, not JSON
          }
        );
        const url = URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(url);
        audio.play();
      } catch (error) {
        console.error('Error with OpenAI TTS:', error);
      }
    };

    const makeRequest= async (prompt: string)  => {
        console.log("Making request with prompt: " + prompt);
        const url = 'http://127.0.0.1:8000/session/'; // Change to actual API URL.
        let data = {
            "session_key": sessionKey,
            "user_prompt": prompt,
            "obj_idx": -1
        };

        if (currentState == 0)
        data = {
            "session_key": sessionKey,
            "user_prompt": prompt,
            "obj_idx": currentObjIdx
        };
        else if (currentState == 1){
            data = {
                "session_key": sessionKey,
                "user_prompt": prompt,
                "obj_idx": currentObjIdx
            };
        }
        else if (currentState == 2) {
            data = {
                "session_key": sessionKey,
                "user_prompt": prompt,
                "obj_idx": currentObjIdx
            };   
        }
        
        else if (currentState == 4)
        data = {
            "session_key": sessionKey,
            "user_prompt": prompt,
            "obj_idx": currentObjIdx
        };

        try {
            const response = await axios.post(url, data);

            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);

            updateSessionKey(response.data.session_key);

            const newState = response.data.current_state;
            updateCurrentState(newState);
            updatePromptType(response.data.response.prompt.type);
            updateConceptList(response.data.response.prompt.question.split("[SEP]"));

            if(newState == 1) {/* Teaching */
                updateSlides(response.data.response.teaching);
                addNewMessage(slides.conversational_response, false);
                synthesizeSpeech(slides.conversational_response);
            }

            else if (newState == 0) { /* Prompting */
                addNewMessage(response.data.response.prompt.question, false);
                synthesizeSpeech(response.data.response.prompt.question)
            }
        } catch (error: any) {
            console.error('Error during POST request:', error);
        } finally {
            
        }
    };
    // const handleSlideChange = async ()

    return (
        <>
            <div className="slide-deck-container">
                <Slide
                    title={slides.slides[slideIndex].title}
                    content={slides.slides[slideIndex].content}
                />
            </div>
            <div className="slide-controllers">
                <button
                    onClick={() => setSlideIndex(slideIndex == 0 ? 0 : slideIndex - 1)}
                >Previous</button>
                <button
                    onClick={() => {
                        setSlideIndex(
                            slideIndex == slides.slides.length - 1
                                ? slides.slides.length - 1
                                : slideIndex + 1
                        );
                        updateCurrentObjIdx(slideIndex);
                        makeRequest("");
                    }
                        //handlingSlideChange();
                    }
                > Next </button>
            </div>
        </>
    );
}

export default SlideDeck;

