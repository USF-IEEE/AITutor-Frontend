import "./MessageBubble.css";

interface MessageBubbleProps {
  message: string;
  isPrompt: boolean;
}

export default function MessageBubble({ message, isPrompt }: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${isPrompt ? "message-bubble-prompt" : "message-bubble-response"}`}>
      <div className="message-bubble-user" style={{ fontWeight: 800 }}>{isPrompt ? 'User' : 'Tutor'}</div>
      <p className={`message-bubble-message ${isPrompt ? 'message-bubble-prompt' : 'message-bubble-response'}`}>
        {`${message}`}
      </p>
    </div>
  );
}
