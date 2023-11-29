import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface MultipleChoiceFormProps {
  question: string;
  options: string[];
  setState: Dispatch<SetStateAction<string>>;
}

const MultipleChoiceForm: React.FC<MultipleChoiceFormProps> = ({ question, options, setState }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setState(selectedValue);
  };

  return (
    <div>
      <p>{question}</p>

      <form>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="multipleChoice"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}> {option}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default MultipleChoiceForm;
