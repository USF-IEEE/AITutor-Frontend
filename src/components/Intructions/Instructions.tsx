import React from 'react';
import landingPageSchema from "../../assets/images/teachabull.gif"
import './Instructions.css';

const Instructions: React.FC = () => {
  return (
    <div className='instruction-container'>
      <img style={{padding:"0.5rem", width:"90%", maxWidth:"800px", maxHeight:"850px", minWidth:"400px", display:"block", margin:"auto"}} src={landingPageSchema}></img>
    </div>
  );
};

export default Instructions;

{/* 
  interface InstructionBoxProps {
    title: string;
    text: string;
  }

  const InstructionBox: React.FC<InstructionBoxProps> = ({ title, text }) => {
    return (
      <div className="instruction-box">
        <h3>{title}</h3>
        <br />
        <p>{text}</p>
      </div>
    );
  };

  <div className="variable-content-container">
    <h2>HOW TO GET THE MOST OUT OF TEACH-A-BULL</h2>
    <br></br>
    <div className="instruction-box-container">
      <InstructionBox
        title="Clarity in Context"
        text="Provide clear and specific context when asking questions or sharing information to receive more accurate and relevant responses."
      />
      <InstructionBox
        title="Effective Prompt Techniques"
        text="Refine your queries or ask follow-up questions to iterate on responses, allowing for a more targeted and improved interaction."
      />
      <InstructionBox
        title="Customize Output Length"
        text="Specify the desired response length to match your preferences, whether you prefer concise answers or more detailed information. This helps tailor the output to your needs."
      />
      <InstructionBox
        title="Iterate for Precision"
        text="Refine your queries or ask follow-up questions to iterate on responses, allowing for a more targeted and improved interaction."
      />
    </div>
  </div> 
*/}

// Clarity in Context:
// Provide clear and specific context when asking questions or sharing information to receive more accurate and relevant responses.

// Effective Prompt Techniques:
// Experiment with different prompt styles, such as open-ended questions or specific keywords, to tailor the level of detail or creativity in the generated content.

// Iterate for Precision:
// Refine your queries or ask follow-up questions to iterate on responses, allowing for a more targeted and improved interaction.

// Customize Output Length:
// Specify the desired response length to match your preferences, whether you prefer concise answers or more detailed information. This helps tailor the output to your needs.