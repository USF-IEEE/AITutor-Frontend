import MessageBubble from '../MessageBubble/MessageBubble'
import './Chat.css'
import { useState, useEffect } from 'react'
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

export default function Chat() {
    
    // keep track of current state
    const [state, setState] = useState<number>(-1);
    const [promptType, setPromptType] = useState<number>(-2)

    //keep track of when things are loading.
    const [loading, setLoading] = useState<boolean>();

    //generating a sessionID to recognize user
    const [session_key, setSession_key] = useState<string>("")

    // making an array of objects where the text will have a different layout depending on if its a response or a prompt
    // this array of objects is what we will display in the chat window
    
    // message is a string retreived from the input in the chat
    const [message, setMessage] = useState<string>("")
    
    //prompt will be an object with isPrompt == True (USER)
    //response will be an object with isPrompt == False (AI TUTOR)
    //each will have a message attribute with the content. 
    const WelcomeMessage = new Message("Welcome to Teach-A-Bull! What do you want to learn today?", false)
    
    const [chat, setChat] = useState<Message[]>([WelcomeMessage])

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()


        // before adding new message check size.
        function makeRequest(prompt:string){// URL to which you want to send the POST request
            
            console.log("Making request with prompt: " + prompt)
            const url = 'http://127.0.0.1:8000/session/'; //change to actual API URL.
            
            // Data to be sent in the request body
            const data = {
                "session_key": session_key,
                "user_prompt": prompt,
            }
            
            // Sending the POST request using axios
            axios.post(url,data)
              .then(response => {
                // Handle the successful response
                console.log('Status Code:', response.status);
                console.log('Response Data:', response.data);
                
                setSession_key(response.data.session_key)
                setState(response.data.current_state)
                setPromptType(response.data.response.prompt.type)
                const newResponse = new Message(response.data.response.prompt.question, false)
                setChat([...chat, newResponse])
                console.log(`session key is ${session_key}\ncurrent state is ${state}\nprompt type is ${promptType}`)
                setLoading(false)
              })
              .catch(error => {
                // Handle errors
                console.error('Something happen while POST request\nError:', error);
              });
            }
        setLoading(true)
        setMessage("")
        makeRequest(message);
    }

    // this makes sure the container is visible when chat overflows
    useEffect(() => {
        console.log(`this is the current chat: ${chat}`);
        let chatContainer: HTMLElement | null = document.querySelector(".text-container");
        if (chatContainer != null){
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, [chat])
        


    
    return (
        <div id='chat-container'>
            <h3 className='watermark'>Teach-A-Bull</h3>
            <div className='text-container'>
                {chat.map((item:Message, key:React.Key) => {
                    return (
                        <MessageBubble key={key} message={item.message} isPrompt={item.isPrompt} />
                    )
                })
                }
            {loading && <Loading/>}
            </div>
            <form className='prompt-submit' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a prompt"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => {const newUserPrompt = new Message(message, true)
                setChat([...chat, newUserPrompt])}} type='submit'>Send</button>
            </form>
        </div>
    )
}

