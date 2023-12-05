import React from 'react';
import axios from 'axios';

interface TTSProps {
  text: string;
}

const TextToSpeech: React.FC<TTSProps> = ({ text }) => {
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  React.useEffect(() => {
    const synthesizeSpeech = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci/tts',
          { input: text, voice: "echo" },
          {
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json',
            },
            responseType: 'blob' // Expect a binary response, not JSON
          }
        );

        const url = URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(url);
        audio.play();
      } catch (error) {
        console.error('Error with OpenAI TTS:', error);
      }
    };

    if (text) {
      synthesizeSpeech();
    }
  }, [text]);

  return null; // This component does not render anything
};

export default TextToSpeech;