import React, { useContext, useState } from "react";
import Slide from "./Slide";
import "./Slides.css"
import { TutorContext, TutorContextProps } from "../../TutorContext";
import TextToSpeech from "../TextToSpeech/TextToSpeech";


const SlideDeck: React.FC = () => {

    const {slides} = useContext<TutorContextProps>(TutorContext);

    const [slideIndex, setSlideIndex] = useState(0); // set to first slide
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
                    onClick={() =>
                        setSlideIndex(
                            slideIndex == slides.slides.length - 1
                                ? slides.slides.length - 1
                                : slideIndex + 1
                        )
                    }
                > Next </button>
            </div>
            <TextToSpeech text={slides.conversational_response}/>
        </>
    );
}

export default SlideDeck;

