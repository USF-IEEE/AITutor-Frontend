import MessageBubble from '../MessageBubble/MessageBubble'
import './Chat.css'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { TutorContext, TutorContextProps } from '../../TutorContext';
import axios from 'axios';
import Loading from '../Loading/Loading';


interface ChatBubble {
    message: string;
    isPrompt: boolean;
}

class Message implements ChatBubble {
    message: string;
    isPrompt: boolean;
    constructor(message: string, isPrompt: boolean) {
        this.message = message;
        this.isPrompt = isPrompt;
    }
}

const Chat:React.FC = () => {
    
    // context vars
    const {currentState, updateCurrentState} = useContext<TutorContextProps>(TutorContext);
    const {sessionKey, updateSessionKey} = useContext<TutorContextProps>(TutorContext);
    const {conceptList, updateConceptList} = useContext<TutorContextProps>(TutorContext);
    const {promptType, updatePromptType} =useContext<TutorContextProps>(TutorContext);
    
    // making an array of objects where the text will have a different layout depending on if its a response or a prompt
    // this array of objects is what we will display in the chat window
    
    // message is a string retreived from the input in the chat
    //prompt will be an object with isPrompt == True (USER)
    //response will be an object with isPrompt == False (AI TUTOR)
    //each will have a message attribute with the content. 
    const [suggestedResponse, setSuggestedResponse] = useState<string[]>([]);

    const WelcomeMessage = new Message("Welcome to Teach-A-Bull! What do you want to learn today?", false)
    const [message, setMessage] = useState<string>("")
    
    const [chat, setChat] = useState<Message[]>([WelcomeMessage])
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const loadingElement = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | undefined>();


    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()


        // before adding new message check size.
        function makeRequest(prompt:string){// URL to which you want to send the POST request
            
            console.log("Making request with prompt: " + prompt)
            const url = 'http://127.0.0.1:8000/session/'; //change to actual API URL.
            
            // Data to be sent in the request body
            const data = {
                "session_key": sessionKey,
                "user_prompt": prompt,
            }
            
            // Sending the POST request using axios
            axios.post(url,data)
              .then(response => {
                // Handle the successful response
                console.log('Status Code:', response.status);
                console.log('Response Data:', response.data);
                
                updateSessionKey(response.data.session_key)
                updateCurrentState(response.data.current_state)
                updatePromptType(response.data.response.prompt.type)
                updateConceptList(response.data.response.prompt.question.split("[SEP]"))
                
                const newResponse = new Message(response.data.response.prompt.question, false)
                setChat((prevChat) => [...prevChat, newResponse]);

                const newSuggestedResponses = response.data.response.prompt.suggested_responses;
                // Update the state with the new suggested responses
                setSuggestedResponse((prevResponses) => [...prevResponses, ...newSuggestedResponses]);


                console.log(`session key is ${sessionKey}\ncurrent state is ${currentState}\nConcept List is ${conceptList}\nsuggested responses are: ${suggestedResponse}\nprompt type is ${promptType}`)
                setLoading(false)
              })
              .catch(error => {
                // Handle errors
                console.error('Something happen while POST request\nError:',error);
                setError(error.code)
              });
            }
        setLoading(true)
        setMessage("")
        makeRequest(message);
    }


    // this makes sure the content is visible when chat overflows
    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, [chat]);
    
    return (
        <div id='chat-container'>
            <h3 className='watermark'>Teach-A-Bull</h3>
            <div className='text-container' ref={chatContainerRef}>
                {chat.map((item:Message, key:React.Key) => {
                    return (
                        <MessageBubble key={key} message={item.message} isPrompt={item.isPrompt} />
                    )
                })
                }
            {/* keep element visible container scrolled down */}

            {loading && <div id='loading-element' ref={loadingElement}><Loading error={error}/></div>}
            <br></br>
            </div>
            <form className='prompt-submit' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a prompt"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button disabled={loading || message == ""} onClick={() => {const newUserPrompt = new Message(message, true)
                setChat([...chat, newUserPrompt])}} type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Chat;