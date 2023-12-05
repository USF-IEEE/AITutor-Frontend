import React, { useContext, useState } from "react";
import Slide from "./Slide";
import "./Slides.css"
import { TutorContext, TutorContextProps } from "../../TutorContext";


const SlideDeck: React.FC = () => {

    const {slides} = useContext<TutorContextProps>(TutorContext);

    const [slideIndex, setSlideIndex] = useState(0); // set to first slide
    
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
                    onClick={() =>
                        setSlideIndex(
                            slideIndex == slides.slides.length - 1
                                ? slides.slides.length - 1
                                : slideIndex + 1
                        )
                        handlingSlideChange();
                    }
                > Next </button>
            </div>
        </>
    );
}

export default SlideDeck;

