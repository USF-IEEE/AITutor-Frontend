import React, { createContext, ReactNode, useState } from 'react';

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
  }
  
// settting default values
const TutorContext = createContext<TutorContextProps>({
    sessionKey: '',
    updateSessionKey: () => {},
    currentState: -2,
    updateCurrentState: () => {},
    conceptList: [],
    updateConceptList: () => {},
    promptType: -2,
    updatePromptType: () => {},
});


interface TutorProviderProps {
    children: ReactNode;
}


const TutorProvider: React.FC<TutorProviderProps> = ({ children }) => {
    const [sessionKey, setSessionKey] = useState<string>("")
    const updateSessionKey = (newSessionKey: string) => {
        setSessionKey(newSessionKey);
    };

    const [currentState, setCurrentState] = useState<number>(-2)
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

    const contextValue: TutorContextProps = {
        sessionKey,
        updateSessionKey,
        currentState,
        updateCurrentState,
        conceptList,
        updateConceptList,
        promptType,
        updatePromptType,
      };
      
    
      return <TutorContext.Provider value={contextValue}>{children}</TutorContext.Provider>;
    };

export { TutorProvider, TutorContext };
