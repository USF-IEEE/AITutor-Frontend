import React, { createContext, ReactNode, useState } from 'react';

type SlideObject = {
    title:string,
    content:string,
    latex:string,
    concepts:string[]
} | null;

// contexts props is the variables or data shared to all children
export interface TutorContextProps {
    sessionKey: string;
    updateSessionKey: (newSessionKey: string) => void;
  
    currentState: number;
    updateCurrentState: (newSessionKey: number) => void;
  
    conceptList: string[];
    updateConceptList: (newSessionKey: string[]) => void;
  
    promptType: number;
    updatePromptType: (newSessionKey: number) => void;

    slides:SlideObject ;
    updateSlides: (newSlides:SlideObject) => void;
  }
  
// settting default values
const TutorContext = createContext<TutorContextProps>({
    sessionKey: '',
    updateSessionKey: () => {},
    currentState: 0,
    updateCurrentState: () => {},
    conceptList: [],
    updateConceptList: () => {},
    promptType: -2,
    updatePromptType: () => {},
    slides: null,
    updateSlides: () => {}
});


interface TutorProviderProps {
    children: ReactNode;
}


const TutorProvider: React.FC<TutorProviderProps> = ({ children }) => {
    const [sessionKey, setSessionKey] = useState<string>("")
    const updateSessionKey = (newSessionKey: string) => {
        setSessionKey(newSessionKey);
    };

    const [currentState, setCurrentState] = useState<number>(0)
    const updateCurrentState = (newCurrentState: number) => {
        setCurrentState(newCurrentState);
    };

    const [conceptList, setConceptList] = useState<string[]>([])
    const updateConceptList = (newConceptList: string[]) => {
        setConceptList(newConceptList);
    };

    const [promptType, setPromptType] = useState<number>(-2)
    const updatePromptType = (newPromptType:number) => {
        setPromptType(newPromptType);
    }

    const [slides, setSlides] = useState<SlideObject>(null);
    const updateSlides = (newSlides:SlideObject) => {
        return setSlides(newSlides);
    }

    const contextValue: TutorContextProps = {
        sessionKey,
        updateSessionKey,
        currentState,
        updateCurrentState,
        conceptList,
        updateConceptList,
        promptType,
        updatePromptType,
        slides,
        updateSlides
      };
      
    
      return <TutorContext.Provider value={contextValue}>{children}</TutorContext.Provider>;
    };

export { TutorProvider, TutorContext };
