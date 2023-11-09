import MessageBubble from '../MessageBubble/MessageBubble'
import './Chat.css'
import { useState } from 'react'

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

    // making an array of objects where the text will have a different layout depending on if its a response or a prompt
    // this array of objects is what we will display in the chat window

    // message is a string retreived from the input in the chat
    const [message, setMessage] = useState("")

    //prompt will be an object with isPrompt == True (USER)
    //response will be an object with isPrompt == False (AI TUTOR)
    //each will have a message attribute with the content. 

    const [chat, setChat] = useState<Message[]>([])

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        let newMessage = new Message(message, true)
        setChat([...chat, newMessage])
        console.log(`chat: ${chat}\nmessage: ${message}`)
        setMessage("")
    }

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
            </div>
            <form className='prompt-submit' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a prompt"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

