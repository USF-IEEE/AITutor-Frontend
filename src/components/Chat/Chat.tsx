import MessageBubble from '../MessageBubble/MessageBubble'
import './Chat.css'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { TutorContext, TutorContextProps } from '../../TutorContext';
import SuggestedResponseBubble from '../SuggestedResponseBubble/SuggestedResponseBubble';
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

const Chat: React.FC = () => {

    // context vars
    const {
        updateCurrentState,
        sessionKey,
        updateSessionKey,
        updateConceptList,
        promptType,
        updatePromptType
    } = useContext<TutorContextProps>(TutorContext);

    // making an array of objects where the text will have a different layout depending on if its a response or a prompt
    // this array of objects is what we will display in the chat window

    // message is a string retreived from the input in the chat
    //prompt will be an object with isPrompt == True (USER)
    //response will be an object with isPrompt == False (AI TUTOR)
    //each will have a message attribute with the content. 

    const [suggestedResponse, setSuggestedResponse] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");

    const WelcomeMessage = new Message("Welcome to Teach-A-Bull! What do you want to learn today?", false)
    const [chat, setChat] = useState<any[]>([WelcomeMessage]);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const loadingElement = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | undefined>();


    async function makeRequest(prompt: string): Promise<void> {
        console.log("Making request with prompt: " + prompt);
        const url = 'http://127.0.0.1:8000/session/'; // Change to actual API URL.

        const data = {
            "session_key": sessionKey,
            "user_prompt": prompt,
        };

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(url, data);

            console.log('Status Code:', response.status);
            console.log('Response Data:', response.data);


            updateSessionKey(response.data.session_key);
            updateCurrentState(response.data.current_state);
            updatePromptType(response.data.response.prompt.type);
            updateConceptList(response.data.response.prompt.question.split("[SEP]"));

            const newResponse = promptType==-1 ? new Message("Awesome work! Now answer the following questionare and we'll take care of the rest for you!", false) : new Message(response.data.response.prompt.question, false);
            setChat((prevChat) => [...prevChat, newResponse]);


            // Replace the suggested responses with the new ones
            setSuggestedResponse(response.data.response.prompt.suggested_responses);

        } catch (error: any) {
            console.error('Error during POST request:', error);
            setError(error.code);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setSuggestedResponse([])
        makeRequest(message);
    }


    // Function to handle clicking on a suggested response
    const handleSuggestedResponseClick = (response: string) => {
        setMessage(response);
    };


    // This is debug for suggested response.
    useEffect(() => {
        console.log("Updated suggested responses:", suggestedResponse);

    }, [suggestedResponse]);


    // This makes sure the content is visible when chat overflows
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chat]);

    const renderSuggestedResponses = () => {

        if (suggestedResponse.length < 1) { return (null) }

        else {
            return (
                <div className='suggested-response-container'>
                    <h3><strong style={{ margin: "0 1rem" }}>Suggested Responses:</strong></h3>
                    {suggestedResponse.map((response, index) => (
                        <SuggestedResponseBubble key={index} response={response} onClick={handleSuggestedResponseClick} />
                    )
                    )}
                </div>
            );
        };
    }

    return (
        <div id='chat-container'>
            <h3 className='watermark'>Teach-A-Bull</h3>
            <div className='text-container' ref={chatContainerRef}>
                {chat.map((item: Message, key: React.Key) => {
                    return (
                        <MessageBubble key={key} message={item.message} isPrompt={item.isPrompt} />
                    )
                })
                }
                {renderSuggestedResponses()}
                {/* keep element visible container scrolled down */}

                {loading && <div id='loading-element' ref={loadingElement}><Loading error={error} /></div>}
                <br></br>
            </div>
            <form className='prompt-submit' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a prompt"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {/* loading animation */}
                <div ref={loadingElement}>
                    <button disabled={loading || message == ""} onClick={() => {
                        const newUserPrompt = new Message(message, true)
                        setChat([...chat, newUserPrompt])
                    }} type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Chat;