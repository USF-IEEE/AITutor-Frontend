import "./MessageBubble.css"

export default function MessageBubble({message, isPrompt}:{message:string, isPrompt:boolean}) {
  return (
    {isPrompt} ? 
    <p className="message-bubble message-bubble-prompt">{`"${message}" `}is a prompt</p> : 
    <p className="mesage-bubble message-bubble-response">{`"${message}"`} is a response</p> 
  )
}
