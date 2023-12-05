import React from 'react';
import axios from 'axios';
import soundIcon from "../../assets/icons/audio-svgrepo-com.svg"

interface TTSProps {
  text: string;
}

const TextToSpeech: React.FC<TTSProps> = ({ text }) => {
    const openaiApiKey = ""; //TODO: fix

    const synthesizeSpeech = async () => {
        console.log("audioing?")
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/audio/speech',
          { input: text, voice: "echo", model:"tts-1"
        },
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
    
    // This component does not render anything
    return <button style={{width:"25px", height:"25px", padding:4}} onClick={synthesizeSpeech}>
        <img src={soundIcon} alt='sound-icon'></img>
    </button>
};

export default TextToSpeech;