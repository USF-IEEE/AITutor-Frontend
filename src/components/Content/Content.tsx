import React, { useContext, useEffect, useState } from "react";
import Questionare from "../Questionare/Questionare";
import Instructions from "../Intructions/Instructions";
import { TutorContext, TutorContextProps } from "../../TutorContext";
import "./Content.css"
import SlideDeck from "../Slides/SlideDeck";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


const Content: React.FC = () => {
  const { currentState } = useContext<TutorContextProps>(TutorContext);
  const [currentContent, setCurrentContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    switch (currentState) {
      //prompting
      case 0:
        setCurrentContent(<Instructions />);
        break;
      //teaching
      case 1:
        setCurrentContent(<SlideDeck/>);
        break;
      //testing
      case 2:
        setCurrentContent(<div className="variable-content-container">CurrentState 2</div>);
        break;
      //learning
      case 3:
        setCurrentContent(<div className="variable-content-container">CurrentState 3</div>);
        break;
      //generation
      case 4:
        setCurrentContent(<Questionare />);
        break;
      default:
        setCurrentContent(<LoadingScreen/>);
        break;
    }
  }, [currentState]);

  return (
    <aside className="content-container">
      {currentContent}
      <h1 style={{position:"absolute"}}>{currentState}</h1>
    </aside>
  );
};

export default Content;
