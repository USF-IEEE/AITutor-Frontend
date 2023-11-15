import "./MessageBubble.css";

interface MessageBubbleProps {
  message: string;
  isPrompt: boolean;
}

export default function MessageBubble({ message, isPrompt }: MessageBubbleProps) {
  return (
    <p className={`message-bubble ${isPrompt ? 'message-bubble-prompt' : 'message-bubble-response'}`}>
      {`${isPrompt ? 'User:' : 'Server:'} "${message}"`}
    </p>
  );
}
