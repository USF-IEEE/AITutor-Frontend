import React from 'react';
import "./SuggestedResponseBubble.css"

interface SuggestedResponseBubbleProps {
    response: string;
    onClick: (response: string) => void;
}

const SuggestedResponseBubble: React.FC<SuggestedResponseBubbleProps> = ({ response, onClick }) => {
    return (
        <a className='suggested-response-bubble' onClick={() => onClick(response)}>{response}</a>
    );
};

export default SuggestedResponseBubble;